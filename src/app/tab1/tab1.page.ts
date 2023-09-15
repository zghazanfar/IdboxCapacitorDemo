import { Component } from '@angular/core';
import { IdboxPlugin} from 'idboxplugin'
//import { FontName,TransPortMethod,ShootMode,TextAlignment } from 'idboxplugin';
import { Globals } from 'src/globals';
//import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import AlphaBankRegisterjson from '../../assets/registersample_1.json';
import PriousBankRegisterjson from '../../assets/registersample_2.json';
import EuroBanlRegisterjson from '../../assets/registersample_3.json';
import worldbridgejson from '../../assets/registersample_4.json';
import worldbridgejsonwithvideo from '../../assets/registersample_5.json';
import TMEDESdkeKYC from '../../assets/registersample_6.json';
import TMEDESdkeKYCId from '../../assets/registersample_7.json';
import TMEDESdkeSign from '../../assets/registersample_9.json';
import eidas from '../../assets/registersample_8.json';
//import { Chooser } from "@awesome-cordova-plugins/chooser";
import { AlertController } from "@ionic/angular";
//import { Device } from '@awesome-cordova-plugins/device/ngx';
import { IonSelect, Platform } from '@ionic/angular';
import { UUID } from 'angular2-uuid';
// import { File } from '@awesome-cordova-plugins/file/ngx';
// import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Camera, CameraResultType, CameraSource, ImageOptions } from '@capacitor/camera';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { FileOpener } from '@capawesome-team/capacitor-file-opener';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';





@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  // constructor() {
  //   IdboxPlugin.registerRequest("anidyaa").then((res)=>{
  //     console.log("agya wapis",res)
  //   });
  // }
  isInvalidCred: any;
  selection: any;
  uuid: any;
  videoCallResult: any;
  myModuleEvt: any;
  registerJson: any;
  requestId: String = "";
  pickeritems = [
    { id: 1, label: 'Register Request', value: 'rr' },
    { id: 2, label: 'Get Next Step', value: 'gns' },
    { id: 3, label: 'Take Selfie', value: 'ts' },
    { id: 4, label: 'Upload 1 Side Identity', value: '1s' },
    { id: 5, label: 'Upload 2 Side Identity', value: '2s' },
    { id: 6, label: 'Upload Additional Documents', value: 'ad' },
    { id: 9, label: 'Please Wait', value: 'pw' },
    { id: 10, label: 'Video Call', value: 'vc' },
    { id: 11, label: 'Video Call Queue', value: 'vcq' },
    { id: 12, label: 'Start Video Session', value: 'vs' },
    { id: 13, label: 'Create Otp', value: 'ad' },
    { id: 14, label: 'ResendOtp', value: 'ad' },
    { id: 15, label: 'ContractForm', value: 'ad' },
    { id: 16, label: 'ContractFormAthex', value: 'ad' },
    { id: 17, label: 'VideoCallVerification', value: 'ad' },
  ]
  BanksFlow = [
    { id: 1, label: 'AlphaBank', value: 'rr' },
    { id: 2, label: 'PiraeusBank', value: 'gns' },
    { id: 3, label: 'EuroBank', value: 'ts' },
    { id: 4, label: 'WorldBridge', value: 'ts' },
    { id: 5, label: 'WorldBridgeWithVideo', value: 'ts' },
    { id: 6, label: 'InvalidBank', value: 'ts' },
    { id: 7, label: 'TMEDESdkeKYC', value: 'ts' },
    { id: 8, label: 'TMEDESdkeKYCId', value: 'ts' },
    { id: 9, label: 'Eidas', value: 'ts' },
    { id: 10, label: 'TMEDESdkeSign', value: 'ts' },


  ]
  constructor( private alertCtrl: AlertController,private platform:Platform) {

  }

  async selectFlow(event: any) {
    this.selection = null
    this.isInvalidCred = false;
    console.log("CheckCondition:", event.target.value.id)
    if (event.target.value.id == 1) {
      Globals.HAWK_ID = "c7c8d91bb23f493ab2074702aecbd2df*"
      Globals.HAWK_KEY = "IC3wkQ87QZKBtO0hTYZrzM0KDnc41L8I5hwkVHZkK3A="
      this.registerJson = AlphaBankRegisterjson
    }
    else if (event.target.value.id == 2) {
      Globals.HAWK_ID = "c7c8d91bb23f493ab2074702aecbd2df*"
      Globals.HAWK_KEY = "IC3wkQ87QZKBtO0hTYZrzM0KDnc41L8I5hwkVHZkK3A="
      this.registerJson = PriousBankRegisterjson
    }
    else if (event.target.value.id == 3) {
      Globals.HAWK_ID = "51bd9a16630349b0b48eaf7849d0946e"
      Globals.HAWK_KEY = "Kmi5QOeIFo5WQjDTEtzBcQWR7Deu5z/TbRjwvCls7kc="
      this.registerJson = EuroBanlRegisterjson
    }
    else if (event.target.value.id == 4) {
      Globals.HAWK_ID = "e6d67e6406864e318fb072f4546d3097"
      Globals.HAWK_KEY = "GI0VlXxvhCi2sUZmPMgaAlFUtSm+OC12UpskHlMlsPE="
      this.registerJson = worldbridgejson
    }
    else if (event.target.value.id == 5) {
      Globals.HAWK_ID = "e6d67e6406864e318fb072f4546d3097"
      Globals.HAWK_KEY = "GI0VlXxvhCi2sUZmPMgaAlFUtSm+OC12UpskHlMlsPE="
      this.registerJson = worldbridgejsonwithvideo
    }
    else if (event.target.value.id == 6) {
      this.isInvalidCred = true;
      Globals.HAWK_ID = "e6d67e6406864e318fb07qwe2f4546d3097"
      Globals.HAWK_KEY = "22dGsdsdI0VlXxvhCi2sUZmPMgaAlFUtSm+OC12UpskHlMlsPE="
      this.registerJson = worldbridgejsonwithvideo
    }
    else if (event.target.value.id == 7) {
      Globals.HAWK_ID = "9e3f78e96c8d45d2b4683b17f3219753"
      Globals.HAWK_KEY = "v5egGWBVUuDGM12ROa3a698yaQw6zRkWj0czoD66WBo="
      this.registerJson = TMEDESdkeKYC
    }
    else if (event.target.value.id == 8) {
      Globals.HAWK_ID = "9e3f78e96c8d45d2b4683b17f3219753"
      Globals.HAWK_KEY = "v5egGWBVUuDGM12ROa3a698yaQw6zRkWj0czoD66WBo="
      this.registerJson = TMEDESdkeKYCId
    }
    else if (event.target.value.id == 9) {
      Globals.HAWK_ID = "dee6bb84e965454a847ac02e2c9aa17a"
      Globals.HAWK_KEY = "Tzp1KXX181Ui7o5uKFUTAlLLez5QMU0aooS5pRjdiDw="
      this.registerJson = eidas
    }
    else if (event.target.value.id == 10) {
      Globals.HAWK_ID = "9e3f78e96c8d45d2b4683b17f3219753"
      Globals.HAWK_KEY = "v5egGWBVUuDGM12ROa3a698yaQw6zRkWj0czoD66WBo="
      this.registerJson = TMEDESdkeSign
    }

  }

  async selectFunction(event: any) {
    //this.selection = null
    if (event.target.value.id == 1) {
      await this.registerRequest();
    }
    else if (event.target.value.id == 2) {
      await this.getNextStep();
    }
    else if (event.target.value.id == 3) {
      await this.takeSelfie();
    }
    else if (event.target.value.id == 4) {
      // Upload 1S
      await this.upload1S_Only();
    }
    else if (event.target.value.id == 5) {
      // Upload 2S
      await this.upload2S_Only();
    }
    else if (event.target.value.id == 6) {
      // Upload Additonal Documents
      await this.uploadAdditionalDocument();
    }
    else if (event.target.value.id == 9) {
      await this.pleaseWait();
    }
    else if (event.target.value.id == 10) {
      await this.videoCall();
    }
    else if (event.target.value.id == 11) {
      await this.videoCallQueue();
    }
    else if (event.target.value.id == 12) {
      // Video Session
      await this.startVideoSession();
    }
    else if (event.target.value.id == 13) {
      // Video Session
      if(this.platform.is("android"))
      {await this.createOtp();}
      else{
        this.resendOtp();
      }
    }
    else if (event.target.value.id == 14) {
      // Video Session
      await this.resendOtp();
    }
    else if (event.target.value.id == 15) {
      // Video Session
      await this.contractForm();
    }
    else if (event.target.value.id == 16) {
      // Video Session
      await this.showFilepicker();
    }
    else if (event.target.value.id == 17) {
      // Video Session
      await this.videoCallverification();
    }
    this.selection = null

  }

  takePicture() {
    const options: ImageOptions = {
      quality: 50,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    }
    Camera.getPhoto(options).then((imageData) => {
      console.log("BASE64JSON", JSON.stringify(imageData))
      this.registerJson.Identity.UserInfo.Image = imageData.base64String
      // this.base64.encodeFile(imageData).then((base64File: string) => {
      //   this.dialogs.alert(base64File)
      // .then(() => console.log('Dialog dismissed'))
      // .catch(e => console.log('Error displaying dialog', e));
      // }, (err) => {
      //   console.log(err);
      // });
    }, (err) => {
      console.log("cameraerror")
      console.log(err);
    });
  }
  async initWithHawkCredentials() {
    try {
      const randomUUID = UUID.UUID();
      console.log('UUID', randomUUID);
      const onBoardiongOptionsObj = {
        url: Globals.BASE_URL,
        hawkId: Globals.HAWK_ID,
        hawkKey: Globals.HAWK_KEY,
        port: Globals.PORT,
        apiPath: Globals.API_PATH,
        requestId: randomUUID,
        readTimeout: 40000,
        connectionTimeout: 40000,
        logging: true,
      };
      if (this.platform.is("android")) {
        this.requestId = randomUUID;
      }
      console.log("initCallwah:")
      await IdboxPlugin.initWithHawkCredentials({options:JSON.stringify(onBoardiongOptionsObj)});
    } catch (error) {
      console.log('InitHawkCredentials error: ', error);
    }
  }

  //calling register Request Method to initialize request

  async registerRequest() {
    //for ios case
    // if ((!this.platform.is("android")) && this.isInvalidCred) {
    //   alert("Something went wrong")
    // }
    this.platform.ready().then(async () => {

   this.initWithHawkCredentials();
   // console.log("RegisterJSON:", JSON.stringify(this.registerJson))
    await IdboxPlugin.registerRequest({options:JSON.stringify(this.registerJson)}) 
    .then(async (res) => {
      console.log("response",JSON.stringify(res));
      // if (res) {
      //   alert("Something went wrong")
      // }
      // else {
        console.log("consoleRes", res)
        alert(JSON.stringify(res));
      // }
    }, (error) => {
      console.log(error);
    })
  })
  
  
    //In ios we are creating requestId in framwork so to get request id we need to call getReuqestId() method
    // if (!this.platform.is("android")) {
    //   await IdboxPlugin.getRequestId().then((res) => {
    //     console.log("REQID:", res)
    //     this.requestId = res
    //   }, (error) => {
    //     console.log(error);
    //   });
    // }

  }

  async saveAndOpenPdf(pdf: string, filename: string) {
    //const writeDirectory = this.platform.is('ios') ? this.file.dataDirectory : this.file.externalDataDirectory;


 let res = await Filesystem.writeFile({
    path: filename+'.pdf',
    data: pdf,
    directory: this.platform.is("android")?Directory.Documents:Directory.External,
  });
//console.log("writefile",JSON.stringify());
    //this.file.writeFile(writeDirectory, filename, this.convertBase64ToBlob(pdf, 'data:application/pdf;base64'), { replace: true })
      // .then(() => {
        // if(this.platform.is("android")){
          await FileOpener.openFile({
            path: res.uri,
          });
        // }
        // else{
        //   await FileOpener.openFile({
        //     path: 'file:///var/mobile/Containers/Data/Application/F71B1E26-0B72-4FB9-A00F-A876FC59E010/Documents/'+filename+'.pdf',
        //   });
        // }
      
        // this.opener.open(writeDirectory + filename, 'application/pdf')
        //   .catch(() => {
        //     console.log('Error opening pdf file');
        //   });
      // })
      // .catch(() => {
      //   console.error('Error writing pdf file');
      // });
  }
  convertBase64ToBlob(b64Data: any, contentType: any): Blob {
    contentType = contentType || '';
    const sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  async getNextStep() {
    try {
      console.log("aya getnextstep",JSON.stringify(IdboxPlugin))
      await IdboxPlugin.getNextStep().then((success) => {
        console.log("GetNextStep", success)
        alert(JSON.stringify(success))
      });
    } catch (error) {
      console.log('getNextStepCall Error:', error);
    }
  }
  async createOtp() {
    try {
      console.log("aya",JSON.stringify(IdboxPlugin));
      if(IdboxPlugin == null){
        console.log("Empty");
        return
      }
      await IdboxPlugin.createOtp().then((otp) => {
        console.log("createotp", otp)
        alert(otp)
      }, error => { console.log("callError", error) });
    } catch (error) {
      console.log('createotp Error:', error);
    }
  }
  async resendOtp() {
    try {
      await IdboxPlugin.resendOtp().then((success) => {
        console.log("resendOtp", success)
        alert(JSON.stringify(success))
      });
    } catch (error) {
      console.log('resendOtp Error:', error);
    }
  }
  async contractForm() {
    try {
      let obj = {
        templateName: "ContractUpload",
        base64: ""
      }
      // await Chooser.getFile().then(async (data1) => {
      //   var fileData: any = data1
      //   obj.base64 = this.trimBase64(fileData.dataURI)
      // })
      const result = await FilePicker.pickFiles({
        types: ['application/pdf'],
        multiple: false,
        readData:true
      });
      console.log("pickerdata",JSON.stringify(result));
      obj.base64 = this.trimBase64(result.files[0].data);

      await IdboxPlugin.contractForm({options:JSON.stringify(obj)}).then((success) => {
        console.log("ContractForm", JSON.stringify(success))
        let resJson = success
        if(resJson.Result.Data == null || resJson.Result.Data == "null" ){
          alert(JSON.stringify(success));
        }
        else{
          this.saveAndOpenPdf(resJson.Result.Data, "doc1");
        }
      }, error => {
        console.log("callError", error)
      });
    } catch (error) {
      console.log('ContractForm Error araha:', error);
    }
  }
  trimBase64(base64: any) {
    const regex = /data:.*base64,/
    return base64.replace(regex, "");
  }
  async showFilepicker() {
    const result = await FilePicker.pickFiles({
      types: ['application/pdf'],
      multiple: false,
      readData:true
    });
    console.log("filepickerr",JSON.stringify(result));
    this.showOtpAlert(result.files[0].data);
    // Chooser.getFile().then(async (data) => {
    //   this.showOtpAlert(data)
    // })
  }
  async contractFormAthex(file: any, otp: any) {

    try {
      let obj = {
        templateName: "DocToUpload2",
        base64: this.trimBase64(file),
        otp: otp.otp
      }
      await IdboxPlugin.contractFormAthex({options:JSON.stringify(obj)}).then((success) => {
        console.log("Contractformathex res", JSON.stringify(success));
        let resJson = success
        if(resJson.Result.Data == null || resJson.Result.Data == "null" ){
          alert(JSON.stringify(success));
        }
        else{
          this.saveAndOpenPdf(resJson.Result.Data, "doc1");
        }
      });
    } catch (error) {
      console.log('Contractformathex Error:', error);
    }
  }
  async videoCallverification() {
    try {
      await IdboxPlugin.videoCallVerification().then((success) => {
        console.log("videoCallVerification", success)
        alert(JSON.stringify(success))
      });
    } catch (error) {
      console.log('videoCallVerification Error:', error);
    }
  }
  async showOtpAlert(file: any) {
    let otpAlert = this.alertCtrl.create({
      header: 'OTP',
      inputs: [
        {
          type: "number",
          min: 5,
          max: 7,
          name: 'otp',
          placeholder: 'Enter Otp'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            this.contractFormAthex(file, data);
          }
        }
      ]
    });
    (await otpAlert).present();
  }
  // calling pleaseWait method to get result of selfie/document verification
  async pleaseWait() {
    try {
      await IdboxPlugin.pleaseWait().then((success) => {
        alert(JSON.stringify(success))
      });
    } catch (error) {
      console.log('pleaseWaitCall Error:', error);
    }
  }

  // videoCallQueue method to enter in queue for videocall.
  async videoCallQueue() {
    try {
      const VideoCallQueueOptions = {
        hawkId: Globals.HAWK_ID,
        hawkKey: Globals.HAWK_KEY,
        port: Globals.PORT,
        url: Globals.BASE_URL,
        apiPathVideo: Globals.SIGNALR_API_PATH_VIDEO
      };
      IdboxPlugin.videoCallQueue({options:JSON.stringify(VideoCallQueueOptions)}).then(async (res) => {
        console.log("lisnter..", res);
        alert(JSON.stringify(res));
      });
    } catch (error) {
      console.log('Video Call Error', error);
    }
  }

  //To Start video call

  async videoCall() {
    try {
      const VideoCallOptions = {
        hawkId: Globals.HAWK_ID,
        hawkKey: Globals.HAWK_KEY,
        port: Globals.PORT,
        url: Globals.BASE_URL
      };
      await IdboxPlugin.videoCall({options:JSON.stringify(VideoCallOptions)}).then(res => {
        console.log("Video Data", res);
        alert(JSON.stringify(res))
        this.videoCallResult = res;
      });

    } catch (error) {
      console.log('Video Call Error', error);
    }
  }

  //Initialiing json for selfie capture
  initSelfieMediaCaptureOptions(shootMode: any) {

    const cameraOptions = {
      url: this.platform.is("android") ? Globals.BASE_URL + Globals.PORT + Globals.API_PATH : Globals.BASE_URL,
      hawkId: Globals.HAWK_ID,
      hawkKey: Globals.HAWK_KEY,
      port: Globals.PORT,
      apiPath: Globals.API_PATH,
      Mode: shootMode,
      fontName: "averta_bold.otf",
      fontSize: 30,
      fontColor: "#76b5c5",
      headerText: "Position your face in the center of the frame second line",//["Hello Zee","How r you"], //,Position your face in the enter of the frame second line
      headerTextFontName:"averta_bold.otf",
      headerTextFontSize: 30,
      headerTextFontColor: "#76b5c5",
      autoCaptureTimeOut: this.platform.is("android") ? 15000 : 10,
      backVisibility: false,
      cornersPathEffect: false,
      selfieTimeout: 10,
      dashPathEffect: true,
      maxFrames: 3,
      //iconCameraBase64Dark:"",
      // files: ["a", "b"],
      flashVisibility: true,
      focusContinuePicture: true,
      footerText: "Itself moving, bring. Face.", //["am", "fine"]
      overlayColor: "#4dff79",
      overlayAlpha: 5,
      roundedFocusFrame: false,
      shutterButtonLight: true,
      thumbnailVisibility: true,
      videoTokenLang: "en",
      metadata: "my_img",
      previewHeaderText: "Preview Header",
      previewHeaderTextFontColor: "#76b5c5",
      previewHeaderTextFontSize: 5,
      previewHeaderMessageAlignment: 5,
      previewFrameBottomText: "PreviewFrameBottomText",
      uploadButtonText: "Upload Image",
      retakeButtonText: "Try Another image",
      previewRetakeTextRect: { xCordinate: 250, yCordinate: 30, width: 100, height: 30 },
      previewRetakeTextFontSize: 5,
      previewRetakeTextBackColor: "#FF0000",
      previewFontName: "averta_bold.otf",
      previewFontSize: 15,
      previewFontColor: "#ff4d4d",
      apiCallLogging: true,
      selfieScaleHeightFactor: 1.2,
      allowToFinishWithEmptyImageList: true,
      previewBackgroundColor: '#3252a8',
      useUploadImageButton: true,
      hasPreview: false,
      previewBottomText: "Text below the buttons",
      bottomColor: '#8532a8',
      previewSliderColor: '#a83269',
      previewBottomColor: '#76b5c5',
      previewAcceptButtonText: "Save image",
      previewAcceptTextBackColor: "#00FF00",
      bottomMessageAlignment: 0,
      previewPromptTextAlignment: 1,
      previewPromptTextRect: { xCordinate: 250, yCordinate: 30, width: 100, height: 30 },
      keepCameraSteadyText: "move camera closer",
      moveCameraCloserText: "No detect face",
      keepCameraCloserText: "No detect face",
      switchingManualModeText: "No Face Detect. Entering manual mode.",
      frontFrameBottomText: "Text for testing purpose",
      selfieRect:{ xCordinate: 50, yCordinate: 80, width: 250, height: 250  },
      previewBoundingRect:{ xCordinate: 30, yCordinate: 30, width: 300, height: 400 }
      // withLayoutParams: layoutParamObj
      // previewBoundingRect: { xCordinate: 20, yCordinate: 30, width: 300, height: 350 },
    };
    return cameraOptions;
  }

  //Initialiing json for document capture
  initDocsMediaCaptureOptions(shootMode: any) {
    const frontHeaderText = {
      subHeaderText: "FrontSubHeader",
      drawable: 'letterf'
    };
    const backHeaderText = {
      subHeaderText: "backHeaderText",
      drawable: 'number2'
    };
    const cgReactObj = {
      xCordinate: 250, yCordinate: 30, width: 100, height: 30
    }
    const cameraOptions = {
      url: this.platform.is("android") ? Globals.BASE_URL + Globals.PORT + Globals.API_PATH : Globals.BASE_URL,
      hawkId: Globals.HAWK_ID,
      hawkKey: Globals.HAWK_KEY,
      port: Globals.PORT,
      apiPath: Globals.API_PATH,
      Mode: shootMode,
      fontName: "averta_bold.otf",
      fontSize: 30,
      fontColor: "#76b5c5",
      headerText: "Text for testing purpose.",//["Hello Zee","How r you"], //,
      headerTextFontName:"averta_bold.otf",
      headerTextFontSize: 30,
      headerTextFontColor: "#76b5c5",
      autoCaptureTimeOut: this.platform.is("android") ? 15000 : 15,
      backVisibility: false,
      cornersPathEffect: true,
      dashPathEffect: true,
      //iconCameraBase64Dark:"",
      // files: ["a", "b"],
      flashVisibility: true,
      focusContinuePicture: true,
      footerText: "Itself moving, bring. Face.",
      overlayColor: "#4dff79",
      overlayAlpha: 5,
      roundedFocusFrame: true,
      shutterButtonLight: true,
      thumbnailVisibility: true,
      videoTokenLang: "en",
      metadata: "my_img",
      previewHeaderText: "Preview Header",
      previewHeaderTextFontColor: "#76b5c5",
      previewHeaderTextFontSize: 5,
      previewHeaderMessageAlignment: 5,
      previewFrameBottomText: "PreviewFrameBottomText",
      uploadButtonText: "Upload Document",
      retakeButtonText: "Try another",
      previewRetakeTextRect: { xCordinate: 250, yCordinate: 30, width: 100, height: 30 },
      previewRetakeTextFontSize: 5,
      previewRetakeTextBackColor: "#FF0000",
      previewFontName: "averta_bold.otf",
      previewFontSize: 15,
      previewFontColor: "#ff4d4d",
      apiCallLogging: true,
      selfieScaleHeightFactor: 1.2,
      allowToFinishWithEmptyImageList: true,
      previewBackgroundColor: '#FF0000',
      useUploadImageButton: true,
      hasPreview: false,
      previewBottomText: "Text below the buttons",
      bottomColor: '#8532a8',
      previewSliderColor: '#a83269',
      previewBottomColor: '#a4a832',
      previewAcceptButtonText: "Save image",
      previewAcceptTextBackColor: "#00FF00",
      bottomMessageAlignment: 0,
      previewPromptTextAlignment: 1,
      previewPromptTextRect: { xCordinate: 250, yCordinate: 30, width: 100, height: 30 },
      keepCameraSteadyText: "Waiting for the document.",
      moveCameraCloserText: "No document in frame.",
      switchingManualModeText: "No document in frame. Entering manual mode.",
      frontFrameBottomText: "Position your document in the enter of the frame second line",
      smallDocumentRect:{ xCordinate: 10, yCordinate: 80, width: 350, height: 400 },
      previewBoundingRect:{ xCordinate: 30, yCordinate: 30, width: 300, height: 400 }
      // previewBoundingRect: { xCordinate: 20, yCordinate: 30, width: 300, height: 350 },
    };
    return cameraOptions;
  }

  //Method to take selfie it will auto handle camera and selfie.
  async takeSelfie() {
    const cameraOptions = this.initSelfieMediaCaptureOptions("PHOTO_ONLY");
    console.log(JSON.stringify(cameraOptions));
    this.platform.ready().then(async () => {
      console.log("Platform readyy")
      await IdboxPlugin.scanSelfie({options:JSON.stringify(cameraOptions)}).then((res) => {
        console.log("CameraSelfie", res)
        alert(JSON.stringify(res))
      });  });
   
  }

  ////Method to scan single side document.
  async upload1S_Only() {
    try {
      const cameraOptions = this.initDocsMediaCaptureOptions("SCAN_1S");
      await IdboxPlugin.scan1SIdentity({options:JSON.stringify(cameraOptions)}).then((res) => {
        console.log("Camerasingleside", res)
        alert(JSON.stringify(res))
      });
    } catch (error) {
      console.log('Scan 1S Only Error', error);
    }
  }

  //Method to  scan double side document.
  async upload2S_Only() {
    try {
      const cameraOptions = this.initDocsMediaCaptureOptions("SCAN_2S");
      await IdboxPlugin.scan2SIdentity({options:JSON.stringify(cameraOptions)}).then((res) => {
        console.log("CameraDoubleSide", res)
        alert(JSON.stringify(res))
      });
    } catch (error) {
      console.log('Scan 2S Only Error', error);
    }
  }

  //Method to scan Additional document
  async uploadAdditionalDocument() {
    try {
      const cameraOptions = this.initDocsMediaCaptureOptions("SCAN_1S_OTHER");
      const respones = await IdboxPlugin.scanAdditionalDocuments({options:JSON.stringify(cameraOptions)}).then((res) => {
        alert(JSON.stringify(res))
      });;
    } catch (error) {
      console.log('Scan 1S Other Error', error);
    }
  }

  //Android specific this not availble in ios. this is use to start video call in android.
  async startVideoSession() {

    try {
      const videoSessionOptions = {
        url: Globals.BASE_URL + Globals.PORT + Globals.API_PATH,
        hawkId: Globals.HAWK_ID,
        hawkKey: Globals.HAWK_KEY,
      }
      const videoResponse = await IdboxPlugin.startVideoSession({options:JSON.stringify(videoSessionOptions)}).then((res) => {
        alert(JSON.stringify(res))
      });
      console.log('Video session Response: ', JSON.stringify(videoResponse));
    } catch (error) {
      console.log('Video session Errir: ', error);
    }
  }
  //Method to configure videoSignalr
  async configureVideoSignalR() {
    try {
      const signalROptions = {
        url: Globals.SIGNALR_URL,
        port: Globals.SIGNALR_PORT,
        apiPath: this.platform.is("android") ? Globals.SIGNALR_API_PATH_VIDEO : Globals.SIGNALR_API_PATH,
        useSignalR: true,
        transportMethod: 0
      };
      await IdboxPlugin.startListeningVideoSignalR({options:JSON.stringify(signalROptions)}).then((res) => {
        alert(JSON.stringify(res))
      });
    } catch (error) {
      console.log('SignalR Video Error ', JSON.stringify(error));
    }
  }


}
