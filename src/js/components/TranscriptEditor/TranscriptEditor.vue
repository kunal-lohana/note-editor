<template>
  <div class="container display">
    <h3>{{brand}} <span class="edit" @click='editButton()' :class="{active : edit}"><i class="far fa-edit" ></i> Edit</span></h3>
    <form class="review-form" @submit.prevent="onSubmit">
        <div class="row">
            <div class="col-sm-3">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{constant.selectCharacter}}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a 
                        class="dropdown-item"
                        href="#" v-for='(character, index) in characters'
                        @click="setValue(character)"
                        :key='index'
                        >
                          <span :style="{'backgroundColor': character.colorCode}" class="character_color"></span>
                          {{character.name}}
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-sm-9 flex">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Dialogue" id="dialogue" v-model="dialogueText" aria-label="Dialogue" aria-describedby="basic-addon1" required>
                </div>
                <div>
                    <input type="submit" class="submit-btn" value="Submit">
                </div>
            </div>
        </div>
    </form>
    <message-list :editorData='data.editorData' :edit='edit' :characters='characters' @edit-disable='editButton'></message-list>
    <div class='button' @click='reverse()'>Reverse</div>
  </div>
      
    
</template>
<script>
import MessageList from '../MessageList/MessageList';
import data from '../../../mockData/mockData'

  export default {
    'name': 'Transcript',
    data () {
      return {
        brand:'Transcript',
        data:data,
        characters: data.characters,
        textColorCode: data.colorCode,
        constant: data.constant,
        selectedCharacter: {},
        isAction : false,
        isNote : false,
        dialogueText: '',
        edit: false
      }
    },
    components : {MessageList},
    methods : {
      editButton(){
        const edit = !this.edit
        this.edit = edit
      },
      setValue (val) {
        this.selectedCharacter = val;
        document.getElementById('dropdownMenuButton').innerHTML = val.name;
      },
      reverse(){
        const editorData = [...this.data.editorData];
        const updatedData = editorData.map(data => {
          return {...data, 'isDragged' : false}
        })
        this.$set(this.data, 'editorData', updatedData)
      },
      onSubmit () {
        let newDialogue = {},
        orderId = this.data.editorData.length;
        if (this.dialogueText) {
          let userData = this.selectedCharacter;
          if(!this.checkMessageType())
          {
            if(!Object.keys(userData).length){
            this.selectedCharacter.name = this.constant.unknown;
            this.selectedCharacter.colorCode = this.textColorCode.unknown;
            }
          }
            newDialogue = {
                ...this.selectedCharacter,
                id : orderId++,
                text: this.dialogueText,
                isMessage : this.isNote || this.isAction ? false : true,
                isAction : this.isAction,
                isNote : this.isNote,
                editable : false,
                order : orderId++,
                isDragged : false,
                known: true
            }
            this.data.editorData.push(newDialogue);
            this.initialData();
        } 
      },
      initialData () {
        this.dialogueText = '',
        this.selectedCharacter = {},
        document.getElementById('dropdownMenuButton').innerHTML = this.constant.selectCharacter;
        this.isAction = false;
        this.isNote= false;
      },
      checkMessageType () {       // check the message type is action or note
        const str = this.dialogueText.trim();
        if(str.charAt(0) === '*' && str.charAt(str.length -1) === '*') {
          this.selectedCharacter.colorCode = this.textColorCode.action,
          this.isAction =  true
          return true;
        }
        if(str.charAt(0) === '[' && str.charAt(str.length -1) === ']') {
          this.selectedCharacter.colorCode = this.textColorCode.note,
          this.isNote =  true;
          return true;
        }
        return false;
      }
    },
    mounted () {}
  }
 
</script>

<style src="./TranscriptEditor.scss" lang="scss" scoped></style>
