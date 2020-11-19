#  Bridges to Prosperity



# Labs 28 Product Demo
[![Bridges To Prosperity Video](http://img.youtube.com/vi/1qVVODfPtto/0.jpg)](http://www.youtube.com/watch?v=1qVVODfPtto " Bridges To Prosperity Product Demonstration")


# Video archive
- [Video Archive](Archive-Videos.md)

# Contributors
- [Project Contributors](Contributors.md)

<br>
<br>

# Project Overview

 #### Bridges to Prosperity is a nonprofit that helps build footbridges in east African communities. They have collected a lot of data about various villages and we need to match it to government data. Afterwards, we will create predictions and visualizations as to where are the best places for footbridges.

##  Key Features

- Visualize Bridge Data on a Map
- Ability to filter through different bridge completion stages
- Ability to see multiple bridge completion stages at once
- Use of map clustering, enhances map performance by an icon with the amount of bridges in an area.
     as you zoom in the bridge point appears.
- Dashboard containing graphs, charts, and tables to visualize bridge data


 #### Bridges to Prosperity is a nonprofit that helps build footbridges in east african communities. They have collected a lot of data about various villages and we need to match it to government data. Afterwards, we will create predictions and visualizations as to where are the best places for footbridges.

### Key Features

- Visulize Bridge Data on a Map
- Ability to filter through different bridge completion stages
- Ability to see multiple bridge completion stages at once
- Use of map clustering, enhances map peformance by an icon with the amount of bridges in an area.
     as you zoom in the bridge point appears.
- Dashboard containting graphs, charts, and tables to visualize bridge data

Trello Board - https://trello.com/b/Tz8190EG/labs-28-bridges-to-prosperity-d

 Product Canvas - https://whimsical.com/LJC7f3n28cAwvU2uSrKYri


 ## UX Design files - Files provided by stakeholder
 
 ####   Brand Guide and Assets 
- https://bridges.app.box.com/s/d9xafgdnzukar2f5frdn4stciud35e1y
#### B2P Site Assessment Data
   
- https://bridges.app.box.com/s/vbgy6a9h0ohunzcuqgfg2mq8r0btvln5
#### Rwanda Administrative Levels and Codes
- https://bridges.app.box.com/s/21mix7vjnoi0v7q099fbr9ojl1gyy29j


## Component Tree

https://whimsical.com/bridgesd-archicture-FLKAKdVCjQuf94pmCpgWac

![Component Tree Image](https://github.com/Lambda-School-Labs/Labs28-Bridges-D-FE/blob/feature/update-README/public/Bridges_To_Prosperity_Component%20Tree.png)



## Tech Stack
 UX Design files - Files provided by stakeholder 
    Brand Guide and Assets 
         https://bridges.app.box.com/s/d9xafgdnzukar2f5frdn4stciud35e1y
    B2P Site Assessment Data 
         https://bridges.app.box.com/s/vbgy6a9h0ohunzcuqgfg2mq8r0btvln5
    Rwanda Administrative Levels and Codes 
         https://bridges.app.box.com/s/21mix7vjnoi0v7q099fbr9ojl1gyy29j

## Tech Stack

### Front end built using:
- [React](https://reactjs.org/)
- [react-map-gl](https://visgl.github.io/react-map-gl/)
- [Ant Design](https://ant.design/)
- [Context API](https://reactjs.org/docs/context.html)
- [Material-UI](https://material-ui.com/)
- [Axios](https://www.npmjs.com/package/axios)
- [Okta](https://www.okta.com/)
- [Recharts](https://recharts.org/en-US/)
- [Supercluster](https://github.com/mapbox/supercluster)
- [useSupercluster](https://www.npmjs.com/package/use-supercluster)
- [framer motion](https://www.framer.com/motion/)

#### _Front end frameworks_

- React

#### Why did you choose this framework?

- React allows for reusable components allowing for **DRY** code and everyone on the team already had experience with React.

#### Front end deployment: [Here](https://d.bridgestoprosperity.dev/main)

#### Back end repo: [Here](https://github.com/Lambda-School-Labs/Labs28-Bridges-D-BE)

#### Back end frameworks

- Node.js
- Express
- PostgreSQL
- Docker

#### Back end libraries
- express-ui
- swagger-jsdoc

# APIs

## [Deployed DS API](http://b2p2018-finalmerge1.eba-4apifgmz.us-east-1.elasticbeanstalk.com/)

This API supplies the map with all of its data points. The deployment is documented using Swagger. Currently modeling is not included in this deployment.

# Environment Variables

In order for the app to function correctly, the user must set up their own environment variables. There should be a .env file containing the following:

🚫These are the fields you will need to set up your project, replace them with the specifics for your app

    
    *  REACT_APP_CLIENT_ID=example - obtain from TPL
    *  REACT_APP_OKTA_ISSUER_URI="https://example-882474.okta.com" - obtain from TPL
    *  REACT_APP_API_URI=http://localhost:8005 - obtain from TPL
    *  REACT_APP_MAPBOX_TOKEN=example - obtain from TPL 


  

# 5️⃣ Content Licenses

🚫For all content - images, icons, etc, use this table to document permission of use. Remove the two placeholders and add you content to this table

| Image Filename | Source / Creator | License                                                                      |
| -------------- | ---------------- | ---------------------------------------------------------------------------- |
| doodles.png    | Nicole Bennett   | [Creative Commons](https://www.toptal.com/designers/subtlepatterns/doodles/) |
| rings.svg      | Sam Herbert      | [MIT](https://github.com/SamHerbert/SVG-Loaders)                             |

# 4️⃣ Testing

🚫Document what you used for testing and why

# 4️⃣ Installation Instructions

🚫explain how to install the required dependencies to get this project up and running with yarn and NPM

## Other Scripts

🚫replace these examples with your own

    * typecheck - runs the TypeScript compiler
    * build - creates a build of the application
    * start - starts the production server after a build is created
    * test - runs tests in **tests** directory \* eject - copy the configuration files and dependencies into the project so you have full control over them

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Backend Documentation](🚫*link to your backend readme here*) for details on the backend of our project.

<!---
🚫 4️⃣ Optional examples of using images with links for your tech stack, make sure to change these to fit your project
![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
![React](https://img.shields.io/badge/react-v16.7.0--alpha.2-blue.svg)
![Typescript](https://img.shields.io/npm/types/typescript.svg?style=flat)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
just 🚫 more info on using badges [here](https://github.com/badges/shields)
--->
