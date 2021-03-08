import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AppPages } from './enums/app-pages.enum';
import { SettingsComponent } from './components/settings/settings.component';
import { SavedGamesComponent } from './components/saved-games/saved-games.component';
import { GameComponent } from './components/game/game.component';
import { HistoryComponent } from './components/history/history.component';

const routes: Routes = [

  { path: AppPages.HOME, component: HomeComponent },
  { path: AppPages.SETTINGS, component: SettingsComponent },
  { path: AppPages.SAVED_GAMES, component: SavedGamesComponent},
  { path: AppPages.GAME, component: GameComponent},
  { path: AppPages.HISTORY, component: HistoryComponent},
  { path: '**', redirectTo: AppPages.HOME },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
