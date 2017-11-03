import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';
import { GraphHttpClient, GraphHttpClientResponse } from '@microsoft/sp-http';

import * as strings from 'AddTaskCommandSetStrings';

const LOG_SOURCE: string = 'AddTaskCommandSet';

export default class AddTaskCommandSet extends BaseListViewCommandSet<{}> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized AddTaskCommandSet');
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    // Show add task command only when one item is selected.
    const addTaskCommand: Command = this.tryGetCommand('ADD_TASK');
    if (addTaskCommand) {
      addTaskCommand.visible = event.selectedRows.length === 1;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    const title: string = event.selectedRows[0].getValueByName('Title');
    const videoLink: string = event.selectedRows[0].getValueByName('Link');

    switch (event.itemId) {
      case 'ADD_TASK':
        // Add training as a task to planner. Show the result in a dialog.
        this._addToPlanner({ title, videoLink })
          .then(() => Dialog.alert(`Add training ${title} to Planner successfully!`))
          .catch((e: Error) => Dialog.alert(`Add training ${title} to Planner failed. ${e.message}`));
        break;
      default:
        throw new Error('Unknown command');
    }
  }

  private async _addToPlanner(info: { title: string, videoLink: string }): Promise<void> {
    // Get the group ID with name *IT Training*.
    const groupResponse: GraphHttpClientResponse = await this.context.graphHttpClient.get(
      "v1.0/groups/?$select=id&$filter=displayName eq 'IT Training'",
      GraphHttpClient.configurations.v1
    );
    if (groupResponse.status !== 200) {
      throw new Error(`Get group request returns ${groupResponse.status}, expect 200`);
    }

    const groupResult: { value: { id: string }[] } = await groupResponse.json();
    if (groupResult.value.length === 0) {
      throw new Error(`Cannot find the IT Training group. Have you created it?`);
    }

    // Get the plan ID with tile *IT Training*.
    const groupId: string = groupResult.value[0].id;
    const planResponse: GraphHttpClientResponse = await this.context.graphHttpClient.get(
      `v1.0/groups/${groupId}/planner/plans?$select=id&$filter=title eq 'IT Training'`,
      GraphHttpClient.configurations.v1
    );
    if (planResponse.status !== 200) {
      throw new Error(`Get planner request returns ${groupResponse.status}, expect 200`);
    }

    const planResult: { value: { id: string }[] } = await planResponse.json();
    if (planResult.value.length === 0) {
      throw new Error(`Cannot find the IT Training planner. Have you created it?`);
    }

    // Create the task about the training to the plan.
    const planId: string = planResult.value[0].id;
    const body: string = JSON.stringify({
      planId,
      title: `Take the training about ${info.title} in ${info.videoLink}`
    });
    const taskResponse: GraphHttpClientResponse = await this.context.graphHttpClient.post(
      'v1.0/planner/tasks',
      GraphHttpClient.configurations.v1,
      { body }
    );
    if (taskResponse.status !== 201) {
      throw new Error(`Create task for ${info.title} failed.`);
    }

    // Finish successfully.
    return;
  }
}
