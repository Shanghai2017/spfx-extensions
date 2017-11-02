# Microsoft Graph Integration

It provides a button in contextual menu to add the training task to [Microsoft Planner](https://tasks.office.com).

## Step 1

1. Read the Microsoft Graph API about [creating a task](https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/planner_post_tasks) in Microsoft Planner. Understand its dependencies and permission scope. It could better to play with the APIs in [Microsoft Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer).

    - To [create a task](https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/planner_post_tasks), it depends on the plan ID.
    - To [retrieve the plan list](https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/plannergroup_list_plans), it depends on group ID.
    - To [retrieve the group list](https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/group_list), we can just get it.
    - The above APIs needs `Group.ReadWrite.All` permission scope.

2. The SPFx Graph integration provides `Group.ReadWrite.All`, `Reports.Read.All` and `User.Read.All` permission scopes.

    - The [`SPGraphHttpClient`](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/overview-graphhttpclient) API will handle the OAuth authorization flow for us.

## Step 2

1. [Microsoft Planner](https://tasks.office.com/) provides a way to create new plans; organize, assign and collaborate on tasks; set due dates; update statuses and share files. Besides, it provides visual dashboards and email notifications to keep everyone informed on progress.

    - Read full introduction [here](https://blogs.office.com/en-us/2016/06/06/microsoft-planner-ready-for-showtime/?eu=true).

2. To simplify our code, we ensure we have the *IT Training* plan within the *IT Training* group. So, we don't need to create a group or a plan on the fly.

    - Go to [Microsoft Planner](https://tasks.office.com/), click *New Plan*, fill the plan name with *IT Training*, click *Create Plan*. That is all! You can keep it public or private as you like.
    - After the plan is created, in the URL, you can see the group ID and plan ID. Remember them to check if they match the value from APIs when debugging.
    - In the right top corner, skip to *Group by progress* view. The default view is *Group by bucket*. Because from the API, we create the tasks without bucket, they will not show in the default view.
    - You will receive an email about *IT Training* group is created. When create a plan, it will implicitly create a group with same name for us.
