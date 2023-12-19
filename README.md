# transportCompanySite
WIP 
Transport and Heavy machinery company website

PORTS:
frontend:	http://localhost:5173/
backend: 	http://localhost:3500/
mongodb://127.0.0.1:27017/avtokranPodemDB
---------- RUNNING PROJECT -------------
REST Api: - currently running with npm run dev = while inside the path: \server
FRONTEND App - currently running with ng serve = while inside the path: \client


EVERYTHING IS STILL A WORK IN PROGRESS

SOME PLANNED THINGS MIGHT NOT MAKE IT TO THE FINAL PROJECT
---------- Features --------------

Home page with reviews/some static info
1 Core features - header = footer = guards = directives = static pages - About Us,



2 Routing

Login and Register Pages 

Equipment page - machine details page




3.For NON-Admin logged users: 

Account page with dashboard - Order Page
    -   that can submit orders to the Api
    -   can interact in a variety of ways with said orders (completing, deleting, leaving a review)
    -   a feedback(Testimonials) functionality in regards of previous service





4.Features for Admin

Admin panel used for:
    -   creation of machine information cards that are present in the equipment page
    -   approval, denial, deletion and completion of order requests made by registered users
    -   approval and deletion of reviews(testimonials) made by users in relation to completed orders
                = basically can choose to put the testimonial on the front page or delete it




5.Some Notable Functionalities:

    -   Simple Role system that determines access to site
    -   Double Auth+Refresh token authentication
        = Auth Expires in 15minutes
        = Refresh expires in 7 days
        = Refresh happens automatically upon request if Auth token is invalid
    -   Google Maps integration(WIP - might not make it to the final presentation)