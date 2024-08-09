import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateTaskComponent } from 'src/app/shared/components/add-update-task/add-update-task.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  tasks: Task[] = [
    {
      id: '1',
      title: 'Pagar el Soat de mi Automovil',
      description: 'Recordar pagar el soat para el miercoles',
      items:[
        { name: 'Actividad 1', completed: true },
        { name: 'Actividad 2', completed: false },
        { name: 'Actividad 3', completed: false },
      ]
    },
    {
      id: '2',
      title: 'Digite su nueva tarea ',
      description: 'Aqui describa su tarea',
      items:[
        { name: 'Actividad 1', completed: true },
        { name: 'Actividad 2', completed: true },
        { name: 'Actividad 3', completed: false },
      ]
    },
    {
      id: '3',
      title: 'Ir Al Gimnasio Todos los Dias',
      description: 'De Lunes a Viernes desde las 8:00 am',
      items:[
        { name: 'Actividad 1', completed: true },
        { name: 'Actividad 2', completed: true },
        { name: 'Actividad 3', completed: true },
      ]
    },
    {
      id: '4',
      title: 'Sacar todos los dias al Perro ',
      description: 'Necesito realizar las siguiente tareas',
      items:[
        { name: 'Matematicas 1', completed: true },
        { name: 'Español 2', completed: false },
        { name: 'Ciencias 3', completed: false },
        { name: 'Quimica 4', completed: true },

      ]
    },
  ]

  constructor(
    private firebaseSvc: FirebaseService,
    private utilSvc: UtilsService
  ) { }

  ngOnInit() {
    this.addOrUpdateTask(this.tasks[0])
  }
 

  getPercentage (task: Task){
    return this.utilSvc.getPercentage(task)
  }

  addOrUpdateTask(task?: Task){
    this.utilSvc.presentModal({
      component: AddUpdateTaskComponent,
      componentProps: { task},
      cssClass: 'add-update-modal'
    })
  }
  getTask() {
    let user: user = this.utilSvc.getElementFromLocalStorage('user')
    let path = `users/${user.uid}`

    this.firebaseSvc.getSubcollection(path, 'tasks')


}

deleteTask(taskId: string) {
  let currentUser: user = this.utilSvc.getElementFromLocalStorage('user');
  let path = `users/${currentUser.uid}/tasks/${taskId}`;

  this.firebaseSvc.deleteDocument(path)
    .then(() => {
      // Remover la tarea eliminada de la lista local
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      console.log('Tarea eliminada correctamente');
    })
    .catch(error => {
      console.error('Error al eliminar la tarea:', error);
    });
}
}

