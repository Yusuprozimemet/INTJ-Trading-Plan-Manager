// Popup.js - Handles interactions in the extension popup

document.addEventListener('DOMContentLoaded', function() {
    const tradingPlanManager = {
        init() {
            this.cacheDOM();
            this.bindEvents();
            this.loadSavedData();
        },

        cacheDOM() {
            // Goal Setting Elements
            this.goalInput = document.getElementById('monthlyGoal');
            this.annualGoalInput = document.getElementById('annualGoal');
            this.sharpeRatioInput = document.getElementById('sharpeRatio');
            this.saveGoalsBtn = document.getElementById('saveGoals');

            // Strategy Elements
            this.strategyAdherenceSelect = document.getElementById('strategyAdherence');
            this.selectionCriteriaSelect = document.getElementById('selectionCriteria');
            this.saveStrategyBtn = document.getElementById('saveStrategy');

            // Risk Management Elements
            this.riskPerTradeInput = document.getElementById('riskPerTrade');
            this.portfolioCorrelationInput = document.getElementById('portfolioCorrelation');
            this.maxDrawdownInput = document.getElementById('maxDrawdown');
            this.saveRiskBtn = document.getElementById('saveRiskParameters');

            // Logging Elements
            this.learningLogTextarea = document.getElementById('learningLog');
            this.saveLearningBtn = document.getElementById('saveLearning');

            this.emotionLogTextarea = document.getElementById('emotionLog');
            this.saveEmotionBtn = document.getElementById('saveEmotion');
        },

        bindEvents() {
            this.saveGoalsBtn.addEventListener('click', () => this.saveGoals());
            this.saveStrategyBtn.addEventListener('click', () => this.saveStrategy());
            this.saveRiskBtn.addEventListener('click', () => this.saveRiskParameters());
            this.saveLearningBtn.addEventListener('click', () => this.saveLearningLog());
            this.saveEmotionBtn.addEventListener('click', () => this.saveEmotionLog());
        },

        loadSavedData() {
            chrome.storage.local.get([
                'monthlyGoal', 'annualGoal', 'sharpeRatio',
                'strategyAdherence', 'selectionCriteria',
                'riskPerTrade', 'portfolioCorrelation', 'maxDrawdown',
                'learningLog', 'emotionLog'
            ], (data) => {
                this.populateFields(data);
            });
        },

        populateFields(data) {
            const fields = [
                'monthlyGoal', 'annualGoal', 'sharpeRatio',
                'strategyAdherence', 'selectionCriteria',
                'riskPerTrade', 'portfolioCorrelation', 'maxDrawdown',
                'learningLog', 'emotionLog'
            ];

            fields.forEach(field => {
                if (data[field] !== undefined) {
                    const element = document.getElementById(field);
                    if (element) element.value = data[field];
                }
            });
        },

        saveGoals() {
            const goals = {
                monthlyGoal: this.goalInput.value,
                annualGoal: this.annualGoalInput.value,
                sharpeRatio: this.sharpeRatioInput.value
            };

            chrome.storage.local.set(goals, () => {
                this.showNotification('Goals Saved', 'Strategic goals have been updated.');
            });
        },

        saveStrategy() {
            const strategyData = {
                strategyAdherence: this.strategyAdherenceSelect.value,
                selectionCriteria: this.selectionCriteriaSelect.value
            };

            chrome.storage.local.set(strategyData, () => {
                this.showNotification('Strategy Tracked', 'Strategy compliance recorded.');
            });
        },

        saveRiskParameters() {
            const riskData = {
                riskPerTrade: this.riskPerTradeInput.value,
                portfolioCorrelation: this.portfolioCorrelationInput.value,
                maxDrawdown: this.maxDrawdownInput.value
            };

            chrome.storage.local.set(riskData, () => {
                this.showNotification('Risk Parameters', 'Risk management settings updated.');
            });
        },

        saveLearningLog() {
            const learningLog = this.learningLogTextarea.value;
            chrome.storage.local.set({ learningLog }, () => {
                this.showNotification('Learning Log', 'Insights have been recorded.');
            });
        },

        saveEmotionLog() {
            const emotionLog = this.emotionLogTextarea.value;
            chrome.storage.local.set({ emotionLog }, () => {
                this.showNotification('Emotion Log', 'Emotional insights captured.');
            });
        },

        showNotification(title, message) {
            const notification = document.createElement('div');
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.right = '20px';
            notification.style.backgroundColor = '#1a5f7a';
            notification.style.color = 'white';
            notification.style.padding = '15px';
            notification.style.borderRadius = '5px';
            notification.style.zIndex = '1000';
            
            notification.innerHTML = `
                <strong>${title}</strong><br>
                ${message}
            `;

            document.body.appendChild(notification);

            setTimeout(() => {
                document.body.removeChild(notification);
            }, 3000);
        }
    };

    tradingPlanManager.init();
});