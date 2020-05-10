import { Component, OnInit } from '@angular/core';
import { Tree } from '../../model/tree.model';
import { UserService } from '../../service/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-trees',
  templateUrl: './trees.component.html',
  styleUrls: ['./trees.component.scss']
})
export class TreesComponent implements OnInit {
  trees: Tree[];
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
      photo: {
        title: 'Photo',
        type: 'html',
        editable: false,
        filter: false,
        valuePrepareFunction: (photo) => {
          if (photo) {
            return this._domSanitizer.bypassSecurityTrustHtml(`
              <img src="${photo}"
                class="img-50 align-top m-r-15 rounded"
                style="height: 50px; object-fit: cover; vertical-align: middle;">
              `);
          } else {
            return this._domSanitizer.bypassSecurityTrustHtml(`
              <img src="assets/images/user.png"
                class="img-50 align-top m-r-15 rounded"
                style="height: 50px; object-fit: cover; vertical-align: middle;">
              `);
          }
        },
      },
      name: {
        title: 'Name'
      },
      description: {
        title: 'Desciption'
      },
      owner: {
        title: 'Owner',
        valuePrepareFunction: (owner) => {
          return owner.fullName;
        }
      }
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
    this.userService.getAllTrees().subscribe((res: any) => {
      this.trees = res.trees;
      console.log(this.trees);
      this.loading = false;
    })
  }
}
