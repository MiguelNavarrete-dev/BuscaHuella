import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilleConfigurationPage } from './profille-configuration.page';

describe('ProfilleConfigurationPage', () => {
  let component: ProfilleConfigurationPage;
  let fixture: ComponentFixture<ProfilleConfigurationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilleConfigurationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
