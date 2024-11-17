import { Student } from '../student';
import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from '../student.service';
import { StudentListComponent } from '../student-list/student-list.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  id!: number;
  student!: Student;

  constructor(private route: ActivatedRoute,private router: Router,
    private studentService: StudentService) { }

  ngOnInit() {
    this.student = new Student();

    this.id = this.route.snapshot.params['id'];
    
    this.studentService.getStudent(this.id)
      .subscribe(data => {
        console.log(data)
        this.student = data;
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['students']);
  }
}