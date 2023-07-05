import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { QuizService } from '../service/quiz.service';
import { Question } from '../interface/question';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Subscription } from 'rxjs';
import { shuffle } from 'lodash';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  questions: Question[] = [];
  quizForm!: FormGroup;
  dialogSubscription!: Subscription;
  dialogMsg: string = 'Ready to submit?';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private quizService: QuizService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.questions = this.quizService.getQuestions();
    this.buildForm();
  }

  ngOnDestroy(): void {
    if(this.dialogSubscription) this.dialogSubscription.unsubscribe();
  }

  buildForm(): void {
    const formControls: Record<string, any> = {};

    this.questions.forEach((question, index) => {
      const shuffledOptions = shuffle(question.options);
      formControls[`question${index}`] = [shuffledOptions[0], Validators.required];
      question.options = shuffledOptions;
    });

    this.quizForm = this.formBuilder.group(formControls);
  }

  openDialog() {
      const dialogRef = this.dialog.open(DialogBoxComponent, {
        data: {
          msg: this.dialogMsg,
        },
        height: '180px',
        width: '235px',
        position: {
          left: '41%',
          top: '-35rem'
        }

      });
      this.dialogSubscription = dialogRef.afterClosed().subscribe((result) => {
        if (result) this.checkAnswers();
      });
  }

  checkAnswers(): void {
    const userAnswers = this.quizForm.value;
    const questions = this.quizService.getQuestions();
  
    let correctAnswersCount = 0;
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const userAnswer = userAnswers[`question${i}`];
  
      if (userAnswer === question.answer) {
        correctAnswersCount++;
      }
    }
    this.quizService.saveQuizResults(this.quizForm.value);
    this.quizService.setQuizAsSubmitted();
    this.quizService.setCorrectAnswersCount(correctAnswersCount);
    this.router.navigate(['/results']);
  }
}
