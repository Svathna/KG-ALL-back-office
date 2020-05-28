import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  users: User[];
  loading: boolean = false;

  public settings = {
    custom: {
      confirm: true
    },
    delete: {
      confirmDelete: true
    },
    pager: {
      display: true,
      perPage: 10
    },
    columns: {
      no: {
        title: "No",
        filter: false,
        valuePrepareFunction: (value, row, cell) => {
          return cell.row.index + 1;
        }
      },
      fullName: {
        title: 'FullName'
      },
    },
    actions: {
      add: false,
      edit: false,
      position: 'right'
    }
  };


  constructor(
    private userService: UserService,
    private _domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loading = true;
    this.userService.getAllUsers().subscribe((res: any) => {
      this.users = res.users;
      console.log(this.users);
      this.loading = false;
    })
  }

}
