import { Component, Host, h, State} from '@stencil/core';

@Component({
  tag: 'boce-create-term',
  styleUrl: 'boce-create-term.css',
  shadow: true,
})
export class BoceCreateTerm {
  @State() isTermCreated: boolean = false;
  @State() isCreateTermClosed: boolean = false;
  @State() isLoggedOut: boolean = false;

  render() {
    if (this.isLoggedOut) {
      return (
        <Host>
          {<boce-login></boce-login>}
        </Host>
      );
    }

    if (this.isCreateTermClosed) {
      return (
        <Host>
          {<boce-doctor-patients-list></boce-doctor-patients-list>}
        </Host>
      );
    }

    if (this.isTermCreated) {
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
        <h1>Vytvorenie nového voľného termínu vyšetrenia</h1>
        <form action="#">
          <div class="form-flex">
            <label htmlFor="date">Dátum vyšetrenia</label>
            <input type="date" id="date" />
            <label htmlFor="begintime">Čas začiatku vyšetrenia</label>
            <input type="time" id="begintime" />
            <label htmlFor="endtime">Čas ukončenia vyšetrenia</label>
            <input type="time" id="endtime" />
            <div class="button-flex">
              <md-elevated-button onClick={() => this.isCreateTermClosed = true}>Zrušiť</md-elevated-button>
              <md-elevated-button onClick={() => this.isTermCreated = true}>Vytvoriť voľný termín</md-elevated-button>
            </div>
          </div>
        </form>
      </Host>
    );
  }

}
