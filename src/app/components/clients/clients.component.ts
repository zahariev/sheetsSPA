import { Client } from './../../models/client';
import { ClientService } from './../../_services/client.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  editMode: boolean = false;
  model: Client = new Client(this.getId());

  constructor(private clientService: ClientService) {}

  async ngOnInit() {
    this.clients = JSON.parse(localStorage.getItem('clients')) || [];
  }

  async getClients() {
    let clients = await this.clientService.getClients().toPromise();

    return clients;
  }

  onSubmit() {
    // this.clientService.updateClient(this.model).subscribe();

    this.clients.filter((sht) => sht.id == this.model.id)[0] = this.model;
    this.saveLocal();
    this.editMode = false;
    this.model = new Client(this.getId());
  }

  saveLocal() {
    localStorage.setItem('clients', JSON.stringify(this.clients));
  }
  cancelEdit() {
    this.editMode = false;
    this.model = new Client(this.getId());
  }

  editClient(idx) {
    // console.log(client);
    this.model = this.clients[idx];
    this.editMode = true;
  }

  getId() {
    return this.clients.length + 1;
  }

  deleteClient(idx) {
    // this.alertify.confirm('Are you sure you want to delete this photo?', () => {
    // this.clientService.deleteClient(id).subscribe(
    //   () => {},
    //   (Error) => {},
    //   () => {
    this.clients.splice(idx, 1);
    // }
    // );
    // remove localy
    this.saveLocal();
  }

  newClient() {
    // this.clientService.insertClient().subscribe(
    //   (client: Client) => {
    //     console.log(client);
    //     if (client)
    this.clients.push(new Client(this.getId()));
    //   },
    //   (error) => {
    //     // message error
    //     console.log(error);
    //   },
    //   () => {}
    // );

    this.saveLocal();
  }
}
