#!/bin/bash
# Kill any existing preview server on port 4173
lsof -ti:4173 | xargs kill -9 2>/dev/null || true

# Build the app
npm run build

# Start preview server on port 4173
npm run preview -- --port 4173 &
PREVIEW_PID=$!
# Wait for server to be ready (up to 10 seconds)
for i in {1..10}; do
  if curl -s http://localhost:4173/Saywhaaa/ > /dev/null; then
    break
  fi
  sleep 1
done

export BASE_URL=http://localhost:4173/Saywhaaa/
npm run e2e
EXIT_CODE=$?
kill $PREVIEW_PID 2>/dev/null || true
exit $EXIT_CODE
