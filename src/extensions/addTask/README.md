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
