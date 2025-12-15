<template>
  <v-container class="pa-8 page-bg">
    <v-row class="mb-6 page-header-row">
      <v-col cols="12">
        <div class="page-header">
          <div class="app-title">GRUPO A</div>
          <div class="app-subtitle">Módulo Acadêmico — Consulta de Alunos</div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="2">
        <v-card class="side-card pa-0" elevation="2">
          <v-list>
            <v-list-item class="side-header">
              <v-list-item-content>
                <div class="side-title">Módulo Acadêmico</div>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-list-item>
              <v-list-item-title class="side-link">Alunos</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="10">
        <v-card class="main-card pa-0" elevation="2">
                <div class="main-header">Consulta de alunos</div>
          <v-card-text>
            <v-row align="center" class="search-row">
              <v-col cols="12" md="8">
                <v-text-field v-model="searchQuery" label="Digite sua busca" dense clearable @keyup.enter="handleSearch" outlined class="search-input" />
              </v-col>
              <v-col cols="12" md="4" class="d-flex align-center justify-end gap-3">
                <v-btn class="me-3" color="grey darken-1" @click="handleSearch" small>Pesquisar</v-btn>
                <v-btn color="grey" @click="openCreate" small>Cadastrar Aluno</v-btn>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider />

          <v-card-text>
            <student-list :students="filtered" @edit="openEdit" @delete="handleDelete" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="640" overlay-class="edit-overlay" content-class="edit-content" attach="body">
      <student-form ref="formComp" :model-value="selected" :mode="formMode" :loading="saving" @save="onFormSave" @cancel="onFormCancel" />
    </v-dialog>

    <confirm-dialog v-model="confirmDeleteOpen" title="Confirm deletion" :message="`Delete ${confirmDeleteStudent?.fullName || ''}?`" confirm-text="Delete" @confirm="onConfirmDelete" />

    <v-snackbar v-model="snackbar.show" :color="snackbar.color">{{ snackbar.text }}</v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import StudentList from '@/components/StudentList.vue'
import StudentForm from '@/components/StudentForm.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { getStudents, createStudent, updateStudent, deleteStudent } from '@/services/api'

const students = ref([])
const searchQuery = ref('')
const dialog = ref(false)
const selected = ref(null)
const formMode = ref('create')
const saving = ref(false)
const formComp = ref(null)
// confirm dialogs
const confirmDeleteOpen = ref(false)
const confirmDeleteStudent = ref(null)
const snackbar = ref({ show: false, text: '', color: 'primary' })

async function fetchStudents() {
  try {
    students.value = await getStudents()
  } catch (err) {
    snackbar.value = { show: true, text: err.message || 'Error fetching students', color: 'error' }
  }
}

onMounted(() => fetchStudents())

// removed global click logger (debug)

const filtered = computed(() => {
  const q = (searchQuery.value || '').toLowerCase().trim()
  if (!q) return students.value
  return students.value.filter(s => {
    return [s.fullName, s.email, s.ra, s.cpf].some(field => String(field || '').toLowerCase().includes(q))
  })
})

function handleSearch() {
  // client-side filtering is handled by computed; this keeps API fetch if needed
}

function openCreate() {
  selected.value = null
  formMode.value = 'create'
  dialog.value = true
}

function openEdit(student) {
  selected.value = { ...student }
  formMode.value = 'edit'
  dialog.value = true
}

function closeDialog() {
  dialog.value = false
}

async function onFormSave(payload) {
  saving.value = true
  try {
    console.debug('onFormSave', { mode: formMode.value, selectedId: selected.value?.id, payload })
    if (formMode.value === 'create') {
      await createStudent(payload)
      snackbar.value = { show: true, text: 'Student created', color: 'success' }
    } else {
      // ensure we have an id
      const id = selected.value?.id
      if (!id) throw new Error('Missing student id for update')
      await updateStudent(id, payload)
      snackbar.value = { show: true, text: 'Student updated', color: 'success' }
    }
    await fetchStudents()
    dialog.value = false
  } catch (err) {
    console.error('onFormSave error', err)
    snackbar.value = { show: true, text: err.message || 'Error saving student', color: 'error' }
  } finally {
    saving.value = false
  }
}

function handleDelete(student) {
  confirmDeleteStudent.value = student
  confirmDeleteOpen.value = true
}

async function onConfirmDelete() {
  const student = confirmDeleteStudent.value
  if (!student) return
  try {
    await deleteStudent(student.id)
    snackbar.value = { show: true, text: 'Student deleted', color: 'success' }
    await fetchStudents()
  } catch (err) {
    snackbar.value = { show: true, text: err.message || 'Error deleting student', color: 'error' }
  } finally {
    confirmDeleteStudent.value = null
  }
}

function onFormCancel() {
  closeDialog()
}
</script>

<style scoped>
.page-bg { background: #f5f7fa; min-height: 100vh }
.search-card { background: #ffffff; border-radius: 10px }
.page-header { display:flex; flex-direction:column; gap:6px; margin-bottom:6px }
.app-title { font-size:22px; font-weight:700; color:#0d47a1 }
.app-subtitle { color: rgba(0,0,0,0.6); font-size:14px }
.page-header-row { margin-bottom: 8px }
.side-card { height: 100%; border-radius:6px; overflow:hidden }
.side-header { background:#e0e0e0 }
.side-title { font-weight:700; padding:12px 16px }
.side-link { padding: 12px 16px }
.main-card { border-radius:8px; background:#fff }
.main-header { background:#eceff1; padding:10px 16px; font-weight:600; text-align:center; border-bottom:1px solid rgba(0,0,0,0.08) }
.main-card .v-card-text { padding-top:12px }
.main-card .v-card-text:first-of-type { padding-bottom:8px }
.search-card { background: #ffffff; border-radius: 10px }
/* Search row alignment tweaks */
.search-row { align-items: center }
.search-row .v-text-field.search-input { margin-bottom: 0 }
.search-row .v-text-field .v-field { min-height: 44px }
.search-row .v-btn { height: 40px; margin-top: 0; padding: 0 14px }
.search-row .v-btn > .v-icon { margin-right: 8px }
.main-card .v-card-text:first-of-type { padding-top: 18px }
/* ensure dialogs overlay above all panels */

/* Edit dialog specific (kept intentionally low so confirm dialog can overlap) */
.edit-overlay { z-index: 1200 !important; position: fixed }
.edit-overlay .v-overlay__scrim { z-index: 1190 !important }
.edit-content { z-index: 1201 !important; position: relative }

/* Generic override removed to avoid forcing all overlays above confirmation */
.v-overlay { z-index: 3000 !important }
</style>

<!-- Global rules to ensure edit dialog sits below confirm dialog -->
<style>
/* If ConfirmDialog already sets very high z-index, these ensure edit is lower */
.edit-overlay { z-index: 1200 !important }
.edit-content { z-index: 1201 !important }
</style>
