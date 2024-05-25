import { State, Component, Host, h } from '@stencil/core';

@Component({
  tag: 'boce-doctor-patients-list',
  styleUrl: 'boce-doctor-patients-list.css',
  shadow: true,
})
export class BoceDoctorPatientsList {
  @State() isCreatingPatient: boolean = false;
  @State() isLoggedOut: boolean = false;
  @State() isCreatingTerm: boolean = false;
  @State() editingEntryIndex: number | null = null;
  @State() searchQuery: string = '';
  @State() searchDate: string = '';
  @State() filteredPatients: any[] = [];
  @State() selectedPatient: any = null; // State to hold the selected patient

  waitingPatients: any[];

  private async getWaitingPatientsAsync() {
    return await Promise.resolve(
      [{
        name: 'Jožko Púčik',
        Id: '1',
        date: new Date("2024-04-01"),
        estimatedStart: "11:00",
        estimatedEnd: "11:20",
        condition: 'Kontrola',
        doctorNote: "",
      }, {
        name: 'Bc. August Cézar',
        Id: '2',
        date: new Date("2024-04-01"),
        estimatedStart: "11:40",
        estimatedEnd: "12:00",
        condition: 'Teploty',
        doctorNote: "",
      }, {
        name: 'Ing. Ferdinand Trety',
        Id: '3',
        date: new Date("2024-04-03"),
        estimatedStart: "10:00",
        estimatedEnd: "10:20",
        condition: 'Bolesti hrdla',
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
    this.filteredPatients = this.waitingPatients.filter(patient => {
      const matchesName = patient.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesDate = this.searchDate ? this.formatDate(new Date(patient.date)) === this.formatDate(new Date(this.searchDate)) : true;
      return matchesName && matchesDate;
    });
  }

  private handleEditClick(index: number) {
    this.editingEntryIndex = index;
    this.selectedPatient = this.filteredPatients[index];
  }

  render() {
    if (this.isLoggedOut) {
      return (
        <Host>
          <boce-login></boce-login>
        </Host>
      );
    }

    if (this.isCreatingPatient) {
      return (
        <Host>
          <boce-create-patient></boce-create-patient>
        </Host>
      );
    }

    if (this.isCreatingTerm) {
      return (
        <Host>
          <boce-create-term></boce-create-term>
        </Host>
      );
    }

    if (this.editingEntryIndex !== null) {
      return (
        <Host>
          <boce-appointment-data patient={this.selectedPatient}></boce-appointment-data>
        </Host>
      );
    }

    return (
      <Host>
        <div class="component-body">
          <header>
            <md-elevated-button onClick={() => this.isCreatingPatient = true}>Vytvor celý záznam o vyšetrení pacienta</md-elevated-button>
            <md-elevated-button onClick={() => this.isLoggedOut = true}>Odhlásiť sa</md-elevated-button>
          </header>
          <h1>Zoznam vykonaných a plánovaných vyšetrení</h1>
          <div class="filterflex">
            <div class="searchflex">
            <label class='headerinline'>Hladať podľa mena pacienta:</label>
              <input
                type="text"
                placeholder="Hľadať podľa mena"
                value={this.searchQuery}
                onInput={(event) => this.handleSearch(event)}
              />
            </div>
            <div class="datepickerflex">
              <label class='headerinline'>Vyberte deň:</label>
              <input type="date" id="Test_DatetimeLocal" value={this.searchDate} onInput={(event) => this.handleDateChange(event)} />
            </div>
          </div>
          <md-list class="patient-list">
            {this.filteredPatients.map((patient, index) =>
              <md-list-item>
                <div slot="headline">{patient.name}</div>
                <div slot="supporting-text">{"Termín vyšetrenia: " + this.formatDate(new Date(patient.date)) + " čas: " + patient.estimatedStart + " - " + patient.estimatedEnd}</div>
                <div slot='supporting-text'>{"Dôvod vyšetrenia: " + patient.condition}</div>
                <div slot="supporting-text">{"Záznam o vykonanom vyšetrení: " + patient.doctorNote}</div>
                <md-icon slot="start">person</md-icon>
                <md-elevated-button slot="end" onClick={() => this.handleEditClick(index)}>Uprav záznam o vyšetrení</md-elevated-button>
              </md-list-item>
            )}
          </md-list>
          <div class="add-term">
            <md-elevated-button onClick={() => this.isCreatingTerm = true}>Pridaj nový termín vyšetrenia</md-elevated-button>
          </div>
        </div>
      </Host>
    );
  }
}
