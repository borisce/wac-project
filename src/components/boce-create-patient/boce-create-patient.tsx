import {Component, Host, Prop, h, State} from '@stencil/core';


@Component({
  tag: 'boce-create-patient',
  styleUrl: 'boce-create-patient.css',
  shadow: true,
})
export class BoceCreatePatient {
  @Prop() entryId: string;

  @State() isCreateClosed: boolean = false;
  @State() isPatientCreated: boolean = false;
  @State() isLoggedOut: boolean = false;

  render() {
    if (this.isLoggedOut) {
      return (
        <Host>
          {<boce-login></boce-login>}
        </Host>
      );
    }

    if (this.isCreateClosed) {
      return (
        <Host>
          {<boce-doctor-patients-list></boce-doctor-patients-list>}
        </Host>
      );
    }

    if (this.isPatientCreated) {
      return (
        <Host>
          {<boce-doctor-patients-list></boce-doctor-patients-list>}
        </Host>
      );
    }

    return (
      <Host>
        <header>
          <md-elevated-button onClick={() => this.isLoggedOut = true}>Odhlásiť sa</md-elevated-button>
        </header>
        <h1>Vytvorenie celého záznamu vyšetrenia pacienta</h1>
        <form action="#">
          <div class="form-flex">
            <h3>Osobné údaje pacienta</h3>
            <label htmlFor="name">Meno a priezvisko</label>
            <input type="text" placeholder='meno a priezvisko' id="name" />
            <h3>Údaje o vyšetrení</h3>
            <label htmlFor="date">Dátum vyšetrenia</label>
            <input type="date" id="date" />
            <label htmlFor="begintime">Čas začiatku vyšetrenia</label>
            <input type="time" id="begintime" />
            <label htmlFor="endtime">Čas ukončenia vyšetrenia</label>
            <input type="time" id="endtime" />
            <label htmlFor="condition">Dôvod vyšetrenia</label>
            <input type="text" placeholder='' id="condition" />
            <label htmlFor="note">Záznam lekára o vykonanom vyšetrení</label>
            <input type="text" placeholder='heslo' id="note" />
            <div class="button-flex">
              <md-elevated-button onClick={() => this.isCreateClosed = true}>Zrušiť</md-elevated-button>
              <md-elevated-button onClick={() => this.isPatientCreated = true}>Vytvoriť záznam o vyšetrení</md-elevated-button>
            </div>
          </div>  
        </form>

      </Host>
    );  
  }

}
