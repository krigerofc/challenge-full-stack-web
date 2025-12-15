<template>
  <v-card class="pa-4 rounded elevation-3 list-card">
    <v-card-title class="text-h6 blue--text">Lista de alunos:</v-card-title>
    <v-card-text>
      <div class="student-grid-table">
        <div class="grid-header">
          <div class="col-ra">RA</div>
          <div class="col-name">Nome</div>
          <div class="col-cpf">CPF</div>
          <div class="col-actions">Ações</div>
        </div>
        <div v-for="student in students" :key="student.id" class="grid-row">
          <div class="col-ra">{{ student.ra }}</div>
          <div class="col-name">{{ student.fullName }}</div>
          <div class="col-cpf">{{ formatCPF(student.cpf) }}</div>
          <div class="col-actions">
            <v-btn class="action-circle edit" small @click="$emit('edit', student)" aria-label="Editar">
              <v-icon size="18" color="white">mdi-pencil-outline</v-icon>
            </v-btn>
            <v-btn class="action-circle delete" small @click="$emit('delete', student)" aria-label="Excluir">
              <v-icon size="18" color="white">mdi-trash-can-outline</v-icon>
            </v-btn>
          </div>
        </div>
        <div v-if="!students || students.length === 0" class="empty">Nenhum aluno encontrado</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({ students: { type: Array, default: () => [] } })
const emit = defineEmits(['edit', 'delete'])

function formatCPF(raw) {
  if (!raw) return ''
  const s = String(raw).replace(/\D/g, '')
  if (s.length === 11) return `${s.slice(0,3)}.${s.slice(3,6)}.${s.slice(6,9)}-${s.slice(9,11)}`
  return raw
}
 </script>
<style scoped>
.list-card { background: #fff }
.student-grid-table {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0;
}
.grid-header, .grid-row {
  display: grid;
  grid-template-columns: 140px 1fr 160px 120px;
  align-items: center;
  min-height: 48px;
  border-bottom: 1px solid #e0e0e0;
}
.grid-header {
  background: #f1f5f9;
  color: #0d47a1;
  font-weight: 600;
  font-size: 1rem;
  padding: 0 0 0 0;
}
.grid-row {
  background: #fff;
  font-size: 0.98rem;
  transition: background 0.2s;
}
.grid-row:hover {
  background: #f5f7fa;
}
.col-ra, .col-cpf {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.col-name {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 8px;
}
.col-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  padding-right: 8px;
}
.action-circle { width:34px; height:34px; min-width:34px; border-radius:50%; display:flex; align-items:center; justify-content:center }
.action-circle.edit { background:#1565c0 }
.action-circle.delete { background:#d32f2f }
.empty { text-align:center; color:rgba(0,0,0,0.6); padding:16px; grid-column: 1 / -1; }

@media (max-width: 900px) {
  .grid-header, .grid-row {
    grid-template-columns: 100px 1fr 110px 80px;
    font-size: 0.95rem;
  }
}
@media (max-width: 600px) {
  .grid-header {
    display: none;
  }
  .grid-row {
    grid-template-columns: 1fr;
    grid-row-gap: 2px;
    padding: 10px 0;
    border-bottom: 1px solid #e0e0e0;
    font-size: 0.97rem;
  }
  .col-ra, .col-name, .col-cpf, .col-actions {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 4px 12px;
    border: none;
    background: none;
    font-weight: 400;
    white-space: normal;
    position: relative;
  }
  .col-ra::before { content: 'RA: '; color: #0d47a1; font-weight: 600; }
  .col-name::before { content: 'Nome: '; color: #0d47a1; font-weight: 600; }
  .col-cpf::before { content: 'CPF: '; color: #0d47a1; font-weight: 600; }
  .col-actions::before { content: 'Ações: '; color: #0d47a1; font-weight: 600; }
  .col-actions { justify-content: flex-end; gap: 8px; }
  }
  </style>
