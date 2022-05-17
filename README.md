# Nativo_Challenge Web App for a URL shortener system.

API Requirements:
Given a URL, we should get back a shortcode for that URL of the shortest possible length.
If the user provides a url like https://nativo.la/insights/something the tool will have to return an unique URL like http://localhost/323AJNB
If you go to http://localhost:3000/323AJNB, you should be redirected to the original URL (https://nativo.la/insights/something).
Invalid URLs should not be able to be entered into the system.
There should be an endpoint to response with the top 20 most frequently accessed shortcodes.
Every URL should store how many times it was requested.

This Web application developed with Express, MongoDB, Jest, React, Bootstrap.
Basically, create new URLs abbreviated links that can previously be used.
