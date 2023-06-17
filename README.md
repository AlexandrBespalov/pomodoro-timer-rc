# Черновой вариант pomodoro-таймера

Из тех проблем, с которыми столкнулся, могу выделить следующее:

1. Переключение задач должно проходить только после начала нового цикла `workTime`. Вместо необходимой реализации таски переключается после завершения любого таймера;
2. Цвет фона. Как бы я не старался, он переключается **как угодно**, но не так как этого хотел я, а именно `workTime` - бледно-красный, `shortBreakTime` - бледно-зеленый, `longBreakTime` - бледно-синий.
3. При попытке реализовать отметку задач выполненными после завершения `workTime` этого не произошло. Однако в ручном режиме добиться этого удалось.# pomodoro-timer-rc
