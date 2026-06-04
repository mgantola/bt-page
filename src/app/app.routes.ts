import { Routes } from '@angular/router';
import { Player } from './player/player';

export const routes: Routes = [
{
    path: 'player/:id',
    component: Player,
    title: 'Player',
},
];
