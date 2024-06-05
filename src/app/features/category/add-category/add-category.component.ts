import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy {

  model: addCategoryRequest;
  private addCategorySubscription?: Subscription

  
  constructor(private CategoryService: CategoryService, private router: Router){
    this.model = {
      name: '',
      urlHandle: ''
    }
  }

  onFormSubmit(){
    console.log(this.model);
    this.addCategorySubscription = this.CategoryService.addCategory(this.model).subscribe({
      next:(response)=>{
        console.log(response);
        this.router.navigateByUrl('/admin/categories')

      },
      error: (error) => {
        console.error('fail', error)
      }
    })
    
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }


}
