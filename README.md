# Quiver Chat

## A MERN application created to provide a global platform for surfboard reviews. 

#### The idea of Quiver Chat was born out of my own frustration of getting personal, user information on surfboards. There are a few clunky old sites where some boards are listed, and there was always the option of asking on reddit, but I wanted to provide a simple and effective review service. 

The site is designed to be sleek and easy to use. The important information is the user comments, so they're emphasized. To comment users must be signed in, a simple process which takes a few seconds in the sidebar. Once signed in users have the ability to comment on any surfboard model. They can view their comment history in the user sidebar, which upon clicked will direct them to that post. 

The homepage includes an autocomplete search box, an interactive slider of recently added models and a list of recent comments on every board. These are all clickable and will lead you to the subject model. 

![Home Page Screenshot](https://surfboardbucket.s3.eu-west-1.amazonaws.com/QUIVERHOME.png)

# How Quiver Chat was Built

## Backend

#### The backend is built with NodeJS and ExpressJS and connects with MongoDB. It is all written in TypeScript and then compiled to CommonJS.

This was my first experience with Typescript and, although very annoying at the start, it really helped me prevent errors and understand the structure of my project better. It forces you to think about the structure of your data and why you're using that specific type. By the end I was used to strongly typing my variables and I'll certainly continue with TS. 

It is essentially a REST API with a variety of routes that the frontend can access to complete tasks. The frontend makes HTTP requests to GET / POST / PUT data to the backend. There are some open GET routes, like to view each model or comments, and there are some restricted routes. 

The restricted routes are handled using PassportJS. When logging in Passport checks the DB for the user and if verified adds the user to the request body. Then a JWT is created a signed using the user and stored as an HTTP-only cookie. Any restricted routes, such as posting a comment, use a Passport JWT Strategy to to extract the JWT from the cookie and pass on the payload to the request callback. If the user is logged in they will pass this step. If not they will receive an error message, depending on which route they're trying to access. 

## Frontend

#### The frontend was created using create-react-app Typescript. 

It features a standard React component structure, with reusable components created and combined. The three main parent components are the homepage, the model page and the user sidebar. These all contain a host of other components, which are dynamically rendered based on the users log-in status. 

I used seperate CSS files for each of these parents, which allowed more organised and readible style files. My goal was to have the UI as sleek and as uncluttered as possible. This app is about surfboards and comments, so that's what I wanted to emphasize. I used many CSS animations to created smooth transitions, like when opening the sidebar or changing between tabs in the user information pane. I'm really happy with how smooth everything in the app moves. 

# Whats Next?

#### At the moment Quiver Chat is definitely in Beta mode. 

The next features added will include: 
- Fully testing the app
- Editing comments 
- Replying and quoting comments 
- Users adding models / suggesting models



