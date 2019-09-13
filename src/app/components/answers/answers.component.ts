import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsoleService } from 'src/app/services/console.service';
import { AnswersService } from 'src/app/services/answers.service';
import { environment } from 'src/environments/environment';
import { Answer } from 'src/app/models/answer';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  listado: Answer[] = [];
  dtTrigger = new Subject();
  dtOptions = environment.DATATABLE_OPTIONS;

  constructor(private answers: AnswersService,
    private console: ConsoleService) { }

  ngOnInit() {
    this.fetchAnswers();
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  fetchAnswers() {
    this.answers.getAnswers().subscribe(data => {
      if (data) {
        this.setListado(data);
      } else {
        console.error('empleados.getAnswers() =', data);
      }
    });
  }

  setListado(data: Answer[]) {
    this.listado = data;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
}
