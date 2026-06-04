import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as playersData from '../../../assets/players.json';

type PlayerDetails = {
  Nombre: string;
};

type PlayersEntry = Record<string, PlayerDetails>;

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.html',
  styleUrl: './player.css',
})
export class Player {
  playerId = signal('');
  private activatedRoute = inject(ActivatedRoute);
  private rawPlayersData = playersData as unknown as
    | PlayersEntry[]
    | { default: PlayersEntry[] };
  infoArray: PlayersEntry[] = Array.isArray(this.rawPlayersData)
    ? this.rawPlayersData
    : this.rawPlayersData.default;
  selectedPlayer = computed<PlayerDetails | null>(() => {
    const currentId = this.playerId();
    if (!currentId) {
      return null;
    }

    const matchedEntry = this.infoArray.find((entry) => currentId in entry);
    return matchedEntry ? matchedEntry[currentId] : null;
  });

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.playerId.set(params['id']);
    });
  }
}
