<template>
  <div>
    <div class="task-card" v-for="(task, index) in tasks" :key="index">
      <div class="task-header">
        <div class="task-title">{{ task.title }}</div>
        <div class="menu-icon">...</div>
      </div>
      <div class="task-body">
        <p><span class="highlight">Title:</span> {{ task.details.title }}</p>
        <p><span class="highlight">Description:</span> {{ task.details.description }}</p>
      </div>
      <div class="task-footer">
        <div class="message-icon">
          <i class="material-icons">email</i>
          <span class="counter">{{ task.messages }}</span>
          <i class="material-icons">attach_file</i>
          <span class="counter">{{ task.attachments }}</span>
        </div>
        <button class="add-user-button">
          <i class="material-icons">person_add</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        {
          title: "Production",
          details: { title: "Title 1", description: "Description 1" },
          messages: 3,
          attachments: 1
        },
        {
          title: "Development",
          details: { title: "Title 2", description: "Description 2" },
          messages: 5,
          attachments: 2
        },
        // Agrega más objetos de tarea aquí si es necesario
      ]
    };
  }
};
</script>

<style scoped>
.task-card {
  background-color: #fff;
  border: 1px solid #d2d6dc;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.task-title {
  background-color: #4299e1;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
}

.menu-icon {
  cursor: pointer;
}

.task-body {
  margin-bottom: 15px;
}

.task-body p {
  margin: 5px 0;
}

.highlight {
  font-weight: bold;
}

.task-footer {
  display: flex;
  justify-content: space-between;
}

.add-user-button {
  background-color: #48BB78;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
}

.add-user-button:hover {
  background-color: #38A169;
}

.message-icon,
.attachment-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.message-icon i,
.attachment-icon i {
  margin-right: 5px;
}

.counter {
  color: #000000;
  padding: 2px 6px;
  border-radius: 55%;
  margin-left: 5px;
}
</style>
