import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedGamesComponent } from './saved-games.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SavedGamesComponent', () => {
  let component: SavedGamesComponent;
  let fixture: ComponentFixture<SavedGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedGamesComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
