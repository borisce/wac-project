import { Component, State, Host, h, Prop } from '@stencil/core';
import { AppointmentsListApiFactory} from '../../api/wac-project';


@Component({
  tag: 'boce-my-appointments',
  styleUrl: 'boce-my-appointments.css',
  shadow: true,
})
export class BoceMyAppointments {
  @State() isLoggedOut: boolean = false;
  @State() isPlannedClicked: boolean = false;
  @State() isAvailableClicked: boolean = false;
  @State() searchQuery: string = ''; // State to hold the search query
  @State() searchDate: string = ''; // State to hold the search date
  @State() filteredPatients: any[] = []; // State to hold the filtered patients
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
  }

  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat('sk-SK', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
  }

  private handleSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.filterPatients();
  }

  private handleDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchDate = input.value;
    this.filterPatients();
  }

  private filterPatients() {
    const formattedSearchDate = this.searchDate ? new Date(this.searchDate).toISOString().slice(0, 10) : '';

    this.filteredPatients = this.waitingPatients.filter(patient => {
      const matchesName = patient.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesDate = this.searchDate ? new Date(patient.date).toISOString().slice(0, 10) === formattedSearchDate : true;
      return matchesName && matchesDate;
    });
  }

  private handleLogout(event: Event) {
    event.preventDefault();
    this.isLoggedOut = true;
  }

  private handlePlannedClick(event: Event) {
    event.preventDefault();
    this.isPlannedClicked = true;
  }

  private handleAvailableClick(event: Event) {
    event.preventDefault();
    this.isAvailableClicked = true;
  }

  render() {
    if (this.isLoggedOut) {
      return (
        <Host>
          <boce-login api-base={this.apiBase}></boce-login>
        </Host>
      );
    }

    if (this.isPlannedClicked) {
      return (
        <Host>
          <boce-planned-appointments api-base={this.apiBase}></boce-planned-appointments>
        </Host>
      );
    }

    if (this.isAvailableClicked) {
      return (
        <Host>
          <boce-reserve-appointment api-base={this.apiBase}></boce-reserve-appointment>
        </Host>
      );
    }

    return (
      <Host>
        <div class="component-body">
          <header>
            <md-elevated-button onClick={(event) => this.handleLogout(event)}>Odhlásiť sa</md-elevated-button>
          </header>
          <h1>História mojich vyšetrení</h1>
          <div class="filterflex">
            <div class="searchflex">
              <label class='headerinline'>Hľadať podľa mena pacienta:</label>
              <input
                type="text"
                placeholder="Hľadať podľa mena"
                value={this.searchQuery}
                onInput={(event) => this.handleSearch(event)}
              />
            </div>
            <div class="datepickerflex">
              <p class='headerinline'>Vyberte deň:</p>
              <input type="date" id="Test_DatetimeLocal" value={this.searchDate} onInput={(event) => this.handleDateChange(event)} />
            </div>
            <md-elevated-button onClick={(event) => this.handlePlannedClick(event)}>Zobraz plánované vyšetrenia</md-elevated-button>
          </div>
          <md-list class="patient-list">
            {this.searchQuery.trim() === '' ? (
              <p>Zadajte meno pacienta do vyhľadávacieho poľa.</p>
            ) : this.filteredPatients.length > 0 ? (
              this.filteredPatients.map(patient =>
                <md-list-item>
                  <div slot="headline">{patient.name}</div>
                  <div slot="supporting-text">{"Termín vyšetrenia: " + this.formatDate(new Date(patient.date)) + " čas: " + patient.estimatedStart + " - " + patient.estimatedEnd}</div>
                  <div slot='supporting-text'>{"Dôvod vyšetrenia: " + patient.condition}</div>
                  <div slot="supporting-text">{"Záznam o vykonanom vyšetrení: " + patient.doctorNote}</div>
                  <md-icon slot="start">person</md-icon>
                </md-list-item>
              )
            ) : (
              <p>Nenašli sa žiadne záznamy pre zadané meno a dátum.</p>
            )}
          </md-list>
          <div class="add-term">
            <md-elevated-button onClick={(event) => this.handleAvailableClick(event)}>Objednanie sa na termín vyšetrenia</md-elevated-button>
          </div>
        </div>
      </Host>
    );
  }
}
