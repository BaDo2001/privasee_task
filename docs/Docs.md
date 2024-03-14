# Privasee demo app

This docs is for detailing the design choices I made whilst developing the app as well as highlighting some of the problems I encountered and how I solved them.

## Chosen technologies

In this section I will detail the main technologies I chose to use and why I chose them. Obviously some of these were prescribed, in which case I will emphasize whether I think they were a good choice or not, what possible alternatives there are and what the trade-offs are.

### TurboRepo

It has an example which already had Vite + Express included so it was a no brainer to use it. It also comes with a lot of nice features like automatic typescript, eslint, prettier and testing setup, and a nice monorepo setup, which makes it easy to share code between the frontend and backend. It also does a lot of caching, which makes it very fast.

### Express

Express is the most basic backend library, which is alright for a project, that is as small as this one. I rarely use it on it's own, given the lack of type safety, and the fact, that it's hard to scale it to a larger project. My go-to option would have been Next.JS, or maybe setting up tPRC for end to end type safety but felt like it would have been an overkill for this project as it only had 5 endpoints. The hardest part was integrating it with Clerk, because I usually pair Clerk with Next.JS, and I had to figure out how to make it work with Express.

### React with Vite

I have been using Vite for 3 years now, it's easy to setup and it's also very fast. React is the best frontend framework in my opinion, it's very easy to get started with a new project, and add features like routing, state management, etc on the go. I haven't over complicated the project with a state management library, the Context API was more than enough for this project.

### Material-UI

I love tailwind, and use it on most of my projects, but I felt like Material-UI was a better choice for this project, because there was no custom design, and I could use the pre-built components to save time. It comes with every component under the sun, and it's very easy to customize, so I didn't feel like I was missing out on anything.

### Airtable

Airtable was one of the biggest pain points, because while it's easy to setup and reduces the tasks of deploying and maintaining a database, it also doesn't come with a typesafe ORM like Prisma, which meant I had to be extra careful, and cover my code with tests, to make sure I don't break anything. It also doesn't support fuzzy search like Postgres, which is a big downside, because I had to do it in memory, which is not ideal for a large dataset.

### Clerk

Clerk is the safe bet for authentication, it comes with nice UI components, social login and it's very easy to setup. It's usually paired with Next.JS, but I managed to make it work with Express, the biggest gotcha was that I had to update the session token logic on the dashboard so that it incldues the users email by default. Also I had to manually add the clerk token to the headers on the frontend, because it's not automatically added like it is with Next.JS.

### React Query

I usually use trpc which is built on top of React Query, and it makes life so much easier with the built in caching and the nice interface with request states. I manually typed the requests, and used axios, which doesn't scale too well, but since I moved the types to a different package and imported them into both the frontend and backend, the typing breaks automatically, if I change the request, so it's not too bad.

### Fuzzy Search

I used fuse.js for fuzzy search, but in an ideal situation this would be done inside the database to improve performance. It has it's own algoritm for scoring the results, which I haven't really tweaked, because it seemed to work out of the box.

## Missing features

Due to the very short time frame, I had to cut some corners, and some features are missing, which I consider to be important. I will list them here, and explain why they are missing.

### Precommit hooks

I usually setup precommit hooks, which run the linter, and the formatter, to make sure that the code is always in a good state. I didn't have time to set it up, and it's not a big deal for a small project like this, but it's a must have for a production app.

### Deployment

Since the app is not built using a full stack framework, it's not as easy to deploy as it would be with something like Next.JS. Ideally I would have built a CI/CD pipeline which bundles the frontend and then uses the backend to serve it. Services like Heroku, Vercel or Render would have been a good choice. It would also be useful to run tests and checks in a separate environment before deploying to production.

### Testing

I only wrote tests for the Airtable integration, because I felt like it was the most fragile part of the backend, and I didn't have time to setup a frontend testing framework like Cypress. The biggest obstacle would be figuring out how to login to Clerk automatically. Tests are quintessential for a production app, but it takes an initial investment to set it up, and the ROI is not immediate, so I had to cut it.

### Error handling

I didn't have time to setup a global error handling system, so the app is not very user friendly when it comes to errors. I would have liked to have a global error boundary, which catches all the errors, and displays a nice error message to the user. Right now the errors are shown in various places and designs, which is not ideal.

### Caching

I used the built in caching of React Query and invalidated the cache on every mutation, which is not optimal, since it's easy to locate the mutation, and update the cache manually.

### State management

I used a single context for the whole app, which means that there are unnecessary re-renders in some components, which can hit performance, but not in this case, because the app is so small.

### Accessibility

I haven't paid any particular attention to accessibility, given the time constraints, but it's a very important aspect of a production app.

### Theming

I didn't have time (or design input) to setup a theming system, so the app is using the default Material-UI theme, which is very basic but gets the job done. It also doesn't have a dark theme right now.

### Responsive design

As always, it's a complex challenge to make a web application functional on a small screen, so I didn't want to make a half-assed attempt at it.

### Localization

It wasn't clear from the requirements, if the app should be localized, so I didn't spend time on it, as it can be a very time consuming task to maintain all the different languages.
