import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {UserService} from "../../profile/shared/user.service";
import {User} from "../../profile/shared/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MountainService} from "../shared/mountain.service";
import {StoryService} from "../../story/shared/story.service";
import {Observable} from "rxjs/Observable";
import {Mountain} from "../shared/mountain.model";



const apiToken = environment.MAPBOX_API_KEY;
declare var omnivore: any;
declare var L: any;
declare var require: any;

const defaultCoords: number[] = [40, -80];
const defaultZoom = 8;

@Component({
  selector: 'app-mountain-profile-visitor',
  templateUrl: './mountain-profile-visitor.component.html',
  styleUrls: ['./mountain-profile-visitor.component.css']
})

export class MountainProfileVisitorComponent implements OnInit {

  mapType = 'streets';
  colorRegion: string;
  user: User = new User();
  constructor(private activatedRoute: ActivatedRoute, private mountainService: MountainService, private userService: UserService, private storyService: StoryService, private router: Router) { }


  ngOnInit() {
    this.getUser(this.activatedRoute.snapshot.params.userId);
    this.mapType = this.activatedRoute.snapshot.params.mapType;
    this.plotMap();
  }

  getUser(userId: string) {
      this.userService.findById(userId)
        .subscribe( userFound => {
          this.user = userFound;
        });
  }

  plotMap() {
    const myStyle = {
      'weight': 2,
      'opacity': 1
    };

    const map = L.map('map').setView(defaultCoords, defaultZoom);
    map.maxZoom = 100;

    const listStyles = ['mapbox.outdoors', 'mapbox.streets', 'mapbox.light', 'mapbox.comic', 'mapbox.streets-satellite', 'mapbox.pencil', 'mapbox.pirates', 'mapbox.high-contrast'];

    const mapLayer = L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.' + this.mapType,
      maxZoom: 15,
      accessToken: apiToken
    }).addTo(map);

    const setStyle = () => {

      geoJsonLayer.eachLayer((layerNew) => {
        this.mountainService.findByName(layerNew.feature.properties.DENUMIRE)
          .subscribe( mountain => {
            this.storyService.getColorRegion(this.user.id, mountain.id)
              .subscribe( color => {
                layerNew.setStyle({
                  weight: 2, opacity: 0.5, fillOpacity: 0.5, color: color
                });
              });
          });

      });



    };


    const customLayer = L.geoJson(null, {

    });



    const geoJsonLayer = omnivore.geojson('../../../assets/mountains.geojson', null, customLayer)
      .on('ready', function () {
        map.fitBounds(geoJsonLayer.getBounds());
        setStyle();
      }).addTo(map);




    const onMountainClick = (e) => {

      const mountainFound: Observable<Mountain> = this.mountainService.findByName(e.layer.feature.properties.DENUMIRE);
      mountainFound.subscribe(mountain => {
        console.log('id: ', mountain.id);
        console.log('name: ', mountain.name);
        this.router.navigateByUrl('/story/getstoriesofmountainuser/' + this.user.id + '/' + mountain.id);
        // e.layer.setStyle({weight: 2, opacity: 0.5, fillOpacity: 0.5, color: e.layer.feature.properties.color});
      });


    };


    geoJsonLayer.on('click', onMountainClick);

    geoJsonLayer.on('mouseover', function(e) {

      e.layer.setStyle({
        fillOpacity: 0.7
      });
      const popup = L.popup()
        .setLatLng(e.latlng)
        .setContent(e.layer.feature.properties.DENUMIRE)
        .openOn(map);
    });

    geoJsonLayer.on('mouseout', function(e) {
      e.layer.setStyle({
        fillOpacity: 0.5
      });
    });



  }

}
