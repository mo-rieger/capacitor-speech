import { Component } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { NavController, Platform } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  matches: String[];
  isRecording = false;

  constructor(
    private tts: TextToSpeech,
    private speechRecognition: SpeechRecognition,
    public navCtrl: NavController,
    private plt: Platform,
    private cd: ChangeDetectorRef) { }


  isIos() {
    return this.plt.is('ios');
  }
  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }
  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }
  startListening() {
    let options = {
      language: 'en-US'
    };
    this.speechRecognition.startListening().subscribe(matches => {
      this.matches = matches;
      this.cd.detectChanges();
    });
    this.isRecording = true;
  }

  play() {
    this.tts.speak('Hello World')
  .then(() => console.log('Success'))
  .catch((reason: any) => console.log(reason));

  }

}
