<template>
    <div class="row">
        <div class="col">
            <div class="texts" v-drag-and-drop:options="options">
                <vue-draggable-group
                    v-model="messages"
                    :groups="messages"
                >
                    <ul class="drag-inner-list">
                        <li v-for='(message, index) in messages'
                        :key='message.id'
                        :data-id="message.id"
                        @change="onGroupsChange"
                        :style="{'backgroundColor': message.colorCode, borderRadius: '5px', padding: '5px'}"
                        
                        class="drag-item"
                        @mouseover='hover(message.id, index)'
                        >
                          <span class="drag-items" :class="{notShow : !message.isDragged}"></span>
                          <b @click="message.name === constant.unknown && editMsg ? unknown(message, index) : null" v-if="message.isMessage">{{message.name}} :</b>
                          <form class="review-form notShow" :class="{show : !message.known}" @submit.prevent="onSubmitChar(index)">
                              <div class="flex">
                                  <div>
                                      <select id="character" v-model="editcharacter" class="character select" @change="setValue($event.target.value, selectCharacters)">
                                          <option v-for='(character, index) in selectCharacters' :key='index'>{{character.name}}<span class="yellow"></span></option>
                                      </select>
                                  </div>
                                  <div>
                                      <input type="submit" class="submit-btn" value="Submit">
                                      <input type="button" class="submit-btn" value="Cancel" @click='disableChar(index)'>
                                  </div>
                              </div>
                          </form>
                          <span @click="editMsg && !message.isAction && !message.isNote? input(message, index) : null">{{message.editable ? '':message.text}}</span>
                          <form class="review-form notShow" :class="{show : message.editable}" @submit.prevent="onSubmit(index)">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Dialogue" id="edit_dialogue" v-model="editDialogue" aria-label="Dialogue" aria-describedby="basic-addon1" required>
                            </div>
                            <div>
                                <input type="submit" class="submit-btn" value="Submit">
                                <input type="button" class="submit-btn" value="Cancel" @click='disableEdit(index)'>
                            </div>
                          </form>
                        </li>                  
                    </ul>
                </vue-draggable-group>
            </div>
        </div>
    </div>
</template>
<script>
import data from '../../../mockData/mockData';

  export default {
    'name': 'MessageList',
    props:{
        editorData:{
            type: Array,
            required: true,
        },
        characters:{
            type: Array,
            required: true,
        },
        edit:{
            type: Boolean,
            required: true
        }
    },
    data () {
      return {
        messages: this.editorData,
        editMsg: this.edit,
        editDialogue: null,
        selectCharacters: this.characters,
        editcharacter: null,
        name: null,
        color: null,
        id: null,
        characterId: null,
        hoverId: null,
        constant: data.constant,
        options: {
        dropzoneSelector: ".drag-inner-list",
        draggableSelector: ".drag-item",
        onDrop: function() {
          this.messages.map((message, index) =>{
            if(message.id === this.hoverId.id){
              if(index !== this.hoverId.index){
                this.messages[index].isDragged = true
              }
            }
          })
        },
        }
      }
    },
    components : {},
    computed : {
    },
    watch: {
      editorData: function(newVal) { // watch it
          this.messages = newVal
      },
      edit: function(newVal) { // watch it
          this.editMsg = newVal
        },  
    },
    methods : {
      onGroupsChange(e){
        console.log(e)
      },
      setValue(val, list){
        list.map(name =>{
          if(name.name===`${val}`){
              this.name = name.name
              this.color = name.colorCode
              this.characterId = name.characterId
          }
        })
      },
      unknown(message, index){
        this.messages[index].known = false
        this.id = this.messages[index].id
        this.$emit('edit-disable', false)
      },
      input(message, index){
        this.messages[index].editable = true
        this.editDialogue = message.text
        this.$emit('edit-disable', false)
      },
      disableChar(index){
        this.messages[index].known = true
      },
      disableEdit(index){
        this.messages[index].editable = false
      },
      onSubmit(index){
        this.messages[index].text = this.editDialogue
        this.messages[index].editable = false
        this.editDialogue = null
      },
      onSubmitChar(index){
        this.messages[index].name = this.name
        this.messages[index].id = this.id
        this.messages[index].characterId = this.characterId
        this.messages[index].colorCode = this.color
        this.messages[index].known = true
        this.editcharacter = null
      },
      hover(id, index){
        this.hoverId = {id, index}
      }
    },
    mounted () {}
  }
 
</script>

<style src="./MessageList.scss" lang="scss" scoped></style>