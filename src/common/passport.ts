import querystring from 'querystring'
import { Express } from 'express-serve-static-core'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { importSQL } from '../utils/commons'
import { poolQuery } from '../database/postgres'

const registerOrLogin = importSQL(__dirname, 'sql/')

export function setPassportStrategies(app: Express) {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        callbackURL: `${process.env.SERVER_URL}:${process.env.PORT}/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        if (profile.emails) {
          const a = await poolQuery(await registerOrLogin, [profile.emails[0].value])
        }

        console.log('profile', profile)
        done(null, profile)
      }
    )
  )

  passport.serializeUser((user, cb) => {
    cb(null, user)
  })

  passport.deserializeUser((obj, cb) => {
    cb(null, obj as any)
  })

  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email', 'openid'] })
  )

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/aa',
    }),
    (req, res) => {
      const query = querystring.stringify({
        id: (req.user as any).id,
      })
      // Successful authentication, redirect home.
      res.redirect('http://localhost:3000/auth?' + query)
      // res.json({ a: req.user })
    }
  )
}
