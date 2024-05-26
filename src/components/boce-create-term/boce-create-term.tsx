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

  private handleLogout(event: Event) {
    event.preventDefault();
    this.isLoggedOut = true;
  }

  private handleClose(event: Event) {
    event.preventDefault();
    this.isCreateTermClosed = true;
  }

  private handleCreateTerm(event: Event) {
    event.preventDefault();
    this.isTermCreated = true;
  }

  render() {
    if (this.isLoggedOut) {
      return (
        <boce-login></boce-login>
      );
    }

    if (this.isCreateTermClosed) {
      return (
        <boce-doctor-patients-list></boce-doctor-patients-list>
      );
    }

    if (this.isTermCreated) {
      return (
        <boce-doctor-patients-list></boce-doctor-patients-list>
      );
    }

    return (
      <Host>
        <header>
          <md-elevated-button onClick={(event) => this.handleLogout(event)}>Odhlásiť sa</md-elevated-button>
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
              <md-elevated-button onClick={(event) => this.handleClose(event)}>Zrušiť</md-elevated-button>
              <md-elevated-button onClick={(event) => this.handleCreateTerm(event)}>Vytvoriť voľný termín</md-elevated-button>
            </div>
          </div>
        </form>
      </Host>
    );
  }

}
