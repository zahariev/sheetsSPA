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
  clients: Client[];
  constructor(private clientService: ClientService) {}

  async ngOnInit() {
    this.clients = await this.getClients();
  }

  async getClients() {
    let clients = await this.clientService.getClients().toPromise();

    return clients;
  }
}
