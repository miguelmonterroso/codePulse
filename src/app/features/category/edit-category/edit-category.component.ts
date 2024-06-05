import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { response } from 'express';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSubscription?: Subscription;
  editCategorySubscription?: Subscription;

  category: Category = { id: '', name: '', urlHandle: '' }; 

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.categoryService.getCategoryById(this.id).subscribe({
            next: (response) => {
              this.category = response;
            }
          });
        }
      },
      error: (error) => {
        console.error('fail', error);
      }
    });
  }

  onDelete():void{
    console.log('hey');
    this.categoryService.deleteCategory(this.category.id).subscribe({
      next:(response)=>{
        this.router.navigateByUrl('/admin/categories')
      }
    })
    
  }

  onFormSubmit(): void {
    console.log(this.category);
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
    }

    if(this.id){
      this.editCategorySubscription = this.categoryService.updateCategory(this.id, updateCategoryRequest).subscribe({
        next:(response) =>{
          this.router.navigateByUrl('/admin/categories')

        }
      })
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }
}
