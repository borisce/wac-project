import { Component, State, Host, h, Prop } from '@stencil/core';
import { AppointmentsListApiFactory, AppointmentsList, Configuration } from '../../api/wac-project';



@Component({
  tag: 'boce-reserve-appointment',
  styleUrl: 'boce-reserve-appointment.css',
  shadow: true,
})
export class BoceReserveAppointment {
  @State() isLoggedOut: boolean = false;
  @State() isReserved: boolean = false;
  @State() isClosed: boolean = false;
  @State() nameInput: string [] = [];
  @State() reasonInput: string [] = [];
  @State() filteredPatients: any[] = [];
  @State() searchDate: string = '';
  @Prop() apiBase: string;
  @State() errorMessage: string;


  waitingPatients: any[];

  private async getAppointmentListAsync() {
    try {
      const response = await
        AppointmentsListApiFactory(undefined, this.apiBase).
          getAppointmentsList()
      if (response.status < 299) {
        return response.data;
      } else {
        this.errorMessage = `Cannot retrieve list of appointments: ${response.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve list of appointments: ${err.message || "unknown"}`
    }
    return [];
  }

  async componentWillLoad() {
    this.waitingPatients = await this.getAppointmentListAsync();
    this.filteredPatients = this.waitingPatients;
  }

  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat('sk-SK', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
  }

  private handleNameInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    this.nameInput = [...this.nameInput];
    this.nameInput[index] = input.value.trim();
  }
  
  private handleReasonInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    this.reasonInput = [...this.reasonInput];
    this.reasonInput[index] = input.value.trim();
  }

  private handleDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchDate = input.value;
    this.filterPatients();
  }

  private filterPatients() {
    this.filteredPatients = this.waitingPatients.filter(patient => {
      const matchesDate = this.searchDate ? this.formatDate(new Date(patient.date)) === this.formatDate(new Date(this.searchDate)) : true;
      return matchesDate;
    });
  }

  private handleLogout(event: Event) {
    event.preventDefault();
    this.isLoggedOut = true;
  }

  private handleReserve(event: Event, index: number) {
    event.preventDefault();
  
    // Get the input values
    const name = this.nameInput[index];
    const reason = this.reasonInput[index];
  
    // Update the item in the filteredPatients array
    const updatedPatient = {
      ...this.filteredPatients[index],
      name: name,
      reason: reason
    };
  
    // Send PUT request to update the item on the server
    const config: Configuration = {
      basePath: this.apiBase,
      isJsonMime: () => true, // Example implementation, adjust as needed
    };
    const apiInstance = AppointmentsListApiFactory(config);
  
    apiInstance.updateAppointment(updatedPatient.id, updatedPatient)
      .then(() => {
        // Update state to reflect reservation
        this.isReserved = true;
      })
      .catch((error) => {
        console.error('Error updating appointment:', error);
      });
  }

  private handleClose(event: Event) {
    event.preventDefault();
    this.isClosed = true;
  }

  render() {
    if (this.isLoggedOut) {
      return (
          <boce-login api-base={this.apiBase}></boce-login>
      );
    }
  
    if (this.isReserved) {
      return (
          <boce-my-appointments api-base={this.apiBase}></boce-my-appointments>
      );
    }
  
    if (this.isClosed) {
      return (
          <boce-my-appointments api-base={this.apiBase}></boce-my-appointments>
      );
    }
  
    return (
      <Host>
        <div class="component-body">
          <header>
            <md-elevated-button onClick={(event) => this.handleLogout(event)}>Odhlásiť sa</md-elevated-button>
          </header>
          <h1>Objednanie sa na vyšetrenie</h1>
          <div class="filterflex">
            <div class="datepickerflex">
              <p class='headerinline'>Vyberte deň:</p>
              <input type="date" id="Test_DatetimeLocal" min={new Date().toISOString().split('T')[0]} value={this.searchDate} onInput={(event) => this.handleDateChange(event)} />
            </div>
          </div>
          {this.filteredPatients.length === 0 ? (
          <p>Žiadne voľné termíny vyšetrení pre zvolený dátum.</p>
        ) : (
          <md-list class="patient-list">
            {this.filteredPatients.map((patient, index) =>
              <md-list-item>
                <div slot="supporting-text">{"Termín vyšetrenia:" + this.formatDate(new Date(patient.date)) + " čas: " + patient.estimatedStart + " - " + patient.estimatedEnd}</div>
                <input slot='end' type="text" placeholder='Zadajte meno a priezvisko' onInput={(event) => this.handleNameInput(event, index)} />
                <input slot='end' type="text" placeholder='Zadajte dôvod vyšetrenia' onInput={(event) => this.handleReasonInput(event, index)} />
                <md-elevated-button slot="end" disabled={!this.nameInput[index] || !this.reasonInput[index]} onClick={(event) => this.handleReserve(event, index)}>Rezervuj vyšetrenie</md-elevated-button>

              </md-list-item>
            )}
          </md-list>
        )}
          
          <div class="back-flex">
            <md-elevated-button onClick={(event) => this.handleClose(event)}>Späť</md-elevated-button>
          </div>
        </div>
      </Host>
    );
  }

}
