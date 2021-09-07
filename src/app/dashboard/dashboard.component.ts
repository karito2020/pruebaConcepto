import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input() name!: string;

  welcomeText: string = ''
  constructor() {
    this.welcomeText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer neque metus, sodales at lacinia vel, feugiat non justo. Aenean ac ligula ex. In elementum mi blandit sem porttitor, et tincidunt sem ultricies. Cras pulvinar ac est in consectetur. Sed luctus eleifend finibus. Vivamus nisl felis, varius eget metus ut, molestie sodales tortor. Fusce ut dapibus tortor. Aenean eu velit eu nisl eleifend rhoncus.'
  }

  ngOnInit(): void {
  }

}
