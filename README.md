This is a angular 7 application.

Landing page is index.html which is internally routed to app.component.html

This page has one input field to take Git Repo input.

On Submit of the input we call Git apis through services (app.service.ts)

If API response is anything other than 200 we show error

If API response is 200 we then compute the required count by subtracting nowtime with the created date.



Improvments which can be made
1) We can put validation on input . i.e. if repo path is invalid with out clicking on search button it will show invalid path.
2) We can customize the filters required. Which is hardcoded now.
3) Git Hub had API rate limits, we can generate Auth key for the app.
4) We can improve UI design.
5) We an have proper route  first by username and then by repo.
