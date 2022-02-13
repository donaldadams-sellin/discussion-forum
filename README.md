# Discussion forum 

A layout/template for a forum with preset topics. Users can make threads and reply to threads, as well as edit/delete their own posts. Contains admin user functionality for adding and removing topics and banning regular users from posting. Supports Markdown in replies using [react-markdown](https://github.com/remarkjs/react-markdown).

# Screenshots


Topic List Page as seen by regular User

![Topic Page](https://i.imgur.com/4zoJdHA.png)

Thread Page as seen by regular User

Note that admin users have name displayed in green, and banned users in red

![Topic Page](https://i.imgur.com/w1CsfvB.png)


Thread Page

Can quote posts from any user to fill in reply 

shows formatting for code blocks and quotes
![Thread Page](https://i.imgur.com/JBGcP9J.png)

Admins have some additonal functionality, adding and deleting topics
![Admin View](https://i.imgur.com/j5ezFOA.png)
Admins can ban non-admin users in replies

![Admin View](https://i.imgur.com/9MqRbKv.png)

# Technologies Used
Built using React, Mongoose, Express and Node. Markdown supported in replies by react-markdown, using the remark-gfm and remark-breaks plugins.

# Getting started

Hosted example forum can be found [here](https://discussion-forumsei.herokuapp.com/).

Trello planning board with user stories and ERD can be found [here](https://trello.com/b/BkyjQP00/discussion-forum-planning).


# Next Steps

Additional features that could be added:
- User Profile Pages
- Search feature to find threads
- Internal private messaging system
- Allow admins to edit topic names/descriptions and sort order