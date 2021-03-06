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
  model: Client = new Client();

  constructor(private clientService: ClientService) {}

  async ngOnInit() {
    this.clients = await this.getClients();
  }

  async getClients() {
    let clients = await this.clientService.getClients().toPromise();

    return clients;
  }

  onSubmit() {
    this.clientService.updateClient(this.model).subscribe();
    this.editMode = false;
    this.model = new Client();
  }

  cancelEdit() {
    this.editMode = false;
    this.model = new Client();
  }

  editClient(client) {
    console.log(client);
    this.model = client;
    this.editMode = true;
  }

  deleteClient(id: number) {
    // this.alertify.confirm('Are you sure you want to delete this photo?', () => {
    this.clientService.deleteClient(id).subscribe(
      () => {},
      (Error) => {},
      () => {
        this.clients.splice(
          this.clients.findIndex((p) => p.id === id),
          1
        );
      }
    );
    // remove localy

    console.log('deletePressed');
  }

  newClient() {
    this.clientService.insertClient().subscribe(
      (client: Client) => {
        console.log(client);
        if (client) this.clients.push(client);
      },
      (error) => {
        // message error
        console.log(error);
      },
      () => {}
    );
  }
}
