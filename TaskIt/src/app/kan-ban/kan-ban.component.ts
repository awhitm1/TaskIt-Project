import { Component } from '@angular/core';
import { CardSettingsModel } from '@syncfusion/ej2-angular-kanban';
import {registerLicense} from '@syncfusion/ej2-base'

registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1NpR2NGfV5yd0VDalxWTndWUiweQnxTdEZiWX5dcHFVQWFVUUR2Wg==')

@Component({
  selector: 'app-kan-ban',
  templateUrl: './kan-ban.component.html',
  styleUrls: ['./kan-ban.component.css']
})
export class KanBanComponent {
  public data: Object[] =  [
    { Id: 1, Status: 'Open', Summary: 'Analyze the new requirements gathered from the customer.', Type: 'Story', Priority: 'Low', Tags: 'Analyze,Customer', Estimate: 3.5, Assignee: 'Nancy Davloio', RankId: 1 },
    { Id: 2, Status: 'InProgress', Summary: 'Fix the issues reported in the IE browser.', Type: 'Bug', Priority: 'Release Breaker', Tags: 'IE', Estimate: 2.5, Assignee: 'Janet Leverling', RankId: 2  },
    { Id: 3, Status: 'Testing', Summary: 'Fix the issues reported by the customer.', Type: 'Bug', Priority: 'Low', Tags: 'Customer', Estimate: '3.5', Assignee: 'Steven walker', RankId: 1 },
    { Id: 4, Status: 'Close', Summary: 'Arrange a web meeting with the customer to get the login page requirements.', Type: 'Others', Priority: 'Low', Tags: 'Meeting', Estimate: 2, Assignee: 'Michael Suyama', RankId: 1 },
    { Id: 5, Status: 'Validate', Summary: 'Validate new requirements', Type: 'Improvement', Priority: 'Low', Tags: 'Validation', Estimate: 1.5, Assignee: 'Robert King', RankId: 1 }
    ];

  public cardSettings: CardSettingsModel = {
    contentField: 'Summary',
    headerField: 'Id'
    };
}
