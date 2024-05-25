import { Component, State, Host, h } from '@stencil/core';


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


  waitingPatients: any[];

  private async getWaitingPatientsAsync() {
    return await Promise.resolve(
        [{
          name: '',
          Id: '1',
          date: new Date("2024-05-30"),
          estimatedStart: "11:00",
          estimatedEnd: "11:20",
          condition: '',
          doctorNote: "",
        }, {
          name: '',
          Id: '2',
          date: new Date("2024-06-01"),
          estimatedStart: "11:40",
          estimatedEnd: "12:00",
          condition: '',
          doctorNote: "",
        }, {
          name: '',
          Id: '3',
          date: new Date("2024-06-01"),
          estimatedStart: "10:00",
          estimatedEnd: "10:20",
          condition: '',
          doctorNote: "",
        }]
    );
  }

  async componentWillLoad() {
    this.waitingPatients = await this.getWaitingPatientsAsync();
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

  render() {
    if (this.isLoggedOut) {
      return (
        <Host>
          <boce-login></boce-login>
        </Host>
      );
    }
  
    if (this.isReserved) {
      return (
        <Host>
          <boce-my-appointments></boce-my-appointments>
        </Host>
      );
    }
  
    if (this.isClosed) {
      return (
        <Host>
          <boce-my-appointments></boce-my-appointments>
        </Host>
      );
    }
  
    return (
      <Host>
        <div class="component-body">
          <header>
            <md-elevated-button onClick={() => this.isLoggedOut = true}>Odhlásiť sa</md-elevated-button>
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
                <md-elevated-button slot="end" disabled={!this.nameInput[index] || !this.reasonInput[index]} onClick={() => this.isReserved = true}>Rezervuj vyšetrenie</md-elevated-button>
              </md-list-item>
            )}
          </md-list>
        )}
          
          <div class="back-flex">
            <md-elevated-button onClick={() => this.isClosed = true}>Späť</md-elevated-button>
          </div>
        </div>
      </Host>
    );
  }

}
