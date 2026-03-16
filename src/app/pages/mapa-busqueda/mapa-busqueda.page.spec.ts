import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapaBusquedaPage } from './mapa-busqueda.page';

describe('MapaBusquedaPage', () => {
  let component: MapaBusquedaPage;
  let fixture: ComponentFixture<MapaBusquedaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaBusquedaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
