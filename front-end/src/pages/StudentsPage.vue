<template>
  <v-container class="pa-6 white-bg">
    <v-row>
      <v-col cols="12">
        <h1 class="page-title">Students</h1>
      </v-col>
    </v-row>

    <student-list :students="students" @create="openCreate" @edit="openEdit" @delete="confirmDelete" />

    <v-dialog v-model="dialog" max-width="600">
      <student-form :model-value="current" :mode="mode" @save="handleSave" @cancel="closeDialog" />
    </v-dialog>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color">{{ snackbar.text }}</v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import StudentList from '../components/StudentList.vue'
import StudentForm from '../components/StudentForm.vue'
import { getStudents, createStudent, updateStudent, deleteStudent } from '../services/api'

const students = ref([])
const dialog = ref(false)
const current = ref(null)
const mode = ref('create')
const snackbar = ref({ show: false, text: '', color: 'primary' })

async function load() {
  students.value = await getStudents()
}

onMounted(load)

function openCreate() {
  current.value = { fullName: '', email: '', ra: '', cpf: '' }
  mode.value = 'create'
  dialog.value = true
}

function openEdit(student) {
  current.value = { ...student }
  mode.value = 'edit'
  dialog.value = true
}

async function handleSave(payload) {
  try {
    if (mode.value === 'create') {
      await createStudent(payload)
      snackbar.value = { show: true, text: 'Student created', color: 'success' }
    } else {
      await updateStudent(current.value.id, payload)
      snackbar.value = { show: true, text: 'Student updated', color: 'success' }
    }
    dialog.value = false
    await load()
  } catch (err) {
    snackbar.value = { show: true, text: err.response?.data?.error || err.message, color: 'error' }
  }
}

function closeDialog() { dialog.value = false }

function confirmDelete(student) {
  if (!confirm(`Delete student ${student.fullName}?`)) return
  doDelete(student.id)
}

async function doDelete(id) {
  try {
    await deleteStudent(id)
    snackbar.value = { show: true, text: 'Student deleted', color: 'success' }
    await load()
  } catch (err) {
    snackbar.value = { show: true, text: err.response?.data?.error || err.message, color: 'error' }
  }
}
</script>

<style scoped>
.white-bg { background: #ffffff; }
.page-title { color: #0d47a1; }
</style>
