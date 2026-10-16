import { test, expect } from '@playwright/test'

test.describe('Todo List App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should add a todo', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?')
    await input.fill('Learn Playwright')
    await page.getByRole('button', { name: 'Add' }).click()

    const todoItem = page.locator('.todo-item').first()
    await expect(todoItem).toContainText('Learn Playwright')
    const checkbox = todoItem.getByRole('checkbox')
    await expect(checkbox).not.toBeChecked()
  })

  test('should toggle a todo', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?')
    await input.fill('Test todo')
    await page.getByRole('button', { name: 'Add' }).click()

    const todoItem = page.locator('.todo-item').first()
    const checkbox = todoItem.getByRole('checkbox')
    await checkbox.check()
    await expect(todoItem).toHaveClass(/completed/)
    await expect(checkbox).toBeChecked()

    await checkbox.uncheck()
    await expect(todoItem).not.toHaveClass(/completed/)
    await expect(checkbox).not.toBeChecked()
  })

  test('should delete a todo', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?')
    await input.fill('Todo to delete')
    await page.getByRole('button', { name: 'Add' }).click()

    const todoItem = page.locator('.todo-item').first()
    await expect(todoItem).toContainText('Todo to delete')

    await todoItem.getByRole('button', { name: 'Delete' }).click()
    await expect(todoItem).not.toBeVisible()
  })

  test('should persist todos in localStorage', async ({ page }) => {
    // Add two todos
    const input = page.getByPlaceholder('What needs to be done?')
    await input.fill('First todo')
    await page.getByRole('button', { name: 'Add' }).click()
    await input.fill('Second todo')
    await page.getByRole('button', { name: 'Add' }).click()

    // Refresh the page
    await page.reload()

    // Check that both todos are still there
    const todoItems = page.locator('.todo-item')
    await expect(todoItems).toHaveCount(2)
    await expect(todoItems.nth(0)).toContainText('First todo')
    await expect(todoItems.nth(1)).toContainText('Second todo')
  })
})
