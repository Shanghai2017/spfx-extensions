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

## Step 3

1. Run `yo @microsoft/sharepoint` to generate a new List View Command Set extension.

2. Update configurations.

    - Update [`config.json`](../../../config/config.json) file to make one bundle.
    - Update [`serve.json`](../../../config/serve.json) file for the test query.

4. Update the command declaration in [manifest file](AddTaskCommandSet.manifest.json).

    - Command ID: ADD_TASK
    - Title: Add a task
    - Icon Image URL: https://png.icons8.com/task-filled/ios7/16/0078d7

5. Implement the visible logic and execution logic in [`AddTaskCommandSet` file](AddTaskCommandSet.ts).

    - Get the group ID with the name **IT Training**.
    - Get the planner ID with the name **IT Training** under the group.
    - Create the task with title and link to the planner.
    - If the task is created successfully, show the succeed message in the dialog.
    - If anything failed during the flow, show the error message in the dialog.

6. Test the extension is working.

    - Refresh the page with test query string.
    - Select one item, click *Add to task* button in contextual menu.
    - Wait a while, the success dialog should pop up.
    - Go to Microsoft Planner, refresh the *IT Training* plan, switch to *Group by progress* view, our new created task should be there.

## Credits

This extension is using some icons from [Icon8](https://icons8.com/). They are licensed under [Creative Commons Attribution-NoDerivs 3.0 Unported](https://creativecommons.org/licenses/by-nd/3.0/). Read its license [here](https://icons8.com/license).
