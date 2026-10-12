overwolf.windows.obtainDeclaredWindow('in_game', (result) => {
  if (result.success) {
    overwolf.windows.restore(result.window.id);
  }
});