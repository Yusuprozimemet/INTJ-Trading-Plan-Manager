// Advanced Logging and Data Management
class TradingPlanManager {
  constructor() {
      this.initializeEventListeners();
      this.loadSavedData();
  }

  initializeEventListeners() {
      // Goals Management
      document.getElementById('saveGoals').addEventListener('click', () => this.saveStrategicGoals());
      
      // Strategy Evaluation
      document.getElementById('saveStrategy').addEventListener('click', () => this.evaluateStrategyCompliance());
      
      // Risk Management
      document.getElementById('saveRiskParameters').addEventListener('click', () => this.saveRiskParameters());
      
      // Learning Log
      document.getElementById('saveLearning').addEventListener('click', () => this.saveLearningInsights());
      
      // Emotional Intelligence
      document.getElementById('saveEmotion').addEventListener('click', () => this.logEmotionalInsights());
  }

  loadSavedData() {
      // Load previously saved data from chrome storage
      chrome.storage.local.get([
          'monthlyGoal', 'annualGoal', 'sharpeRatio', 
          'strategyAdherence', 'selectionCriteria',
          'riskPerTrade', 'portfolioCorrelation', 'maxDrawdown',
          'learningLog', 'emotionLog'
      ], (result) => {
          this.populateFields(result);
      });
  }

  populateFields(data) {
      const fieldsToPopulate = [
          'monthlyGoal', 'annualGoal', 'sharpeRatio', 
          'strategyAdherence', 'selectionCriteria',
          'riskPerTrade', 'portfolioCorrelation', 'maxDrawdown',
          'learningLog', 'emotionLog'
      ];

      fieldsToPopulate.forEach(field => {
          const element = document.getElementById(field);
          if (element && data[field]) {
              element.value = data[field];
          }
      });
  }

  saveStrategicGoals() {
      const goals = {
          monthlyGoal: document.getElementById('monthlyGoal').value,
          annualGoal: document.getElementById('annualGoal').value,
          sharpeRatio: document.getElementById('sharpeRatio').value
      };

      chrome.storage.local.set(goals, () => {
          this.showNotification('Strategic Goals Updated', 'Goals have been systematically logged.');
      });
  }

  evaluateStrategyCompliance() {
      const strategyData = {
          strategyAdherence: document.getElementById('strategyAdherence').value,
          selectionCriteria: document.getElementById('selectionCriteria').value
      };

      // Calculate compliance score
      const complianceScore = (
          parseInt(strategyData.strategyAdherence) + 
          parseInt(strategyData.selectionCriteria)
      ) / 2;

      strategyData.complianceScore = complianceScore;

      chrome.storage.local.set(strategyData, () => {
          this.showNotification('Strategy Compliance Analysis', 
              `Compliance Score: ${complianceScore}%\n${this.getComplianceRecommendation(complianceScore)}`);
      });
  }

  getComplianceRecommendation(score) {
      if (score >= 90) return "Excellent strategy execution. Continue current approach.";
      if (score >= 75) return "Good performance. Minor refinements recommended.";
      if (score >= 50) return "Significant strategy deviation. Comprehensive review needed.";
      return "Critical strategy misalignment. Immediate strategic reassessment required.";
  }

  saveRiskParameters() {
      const riskParams = {
          riskPerTrade: document.getElementById('riskPerTrade').value,
          portfolioCorrelation: document.getElementById('portfolioCorrelation').value,
          maxDrawdown: document.getElementById('maxDrawdown').value
      };

      chrome.storage.local.set(riskParams, () => {
          this.showNotification('Risk Parameters Updated', 
              'Advanced risk management parameters systematically logged.');
      });
  }

  saveLearningInsights() {
      const learningLog = document.getElementById('learningLog').value;
      chrome.storage.local.set({ learningLog }, () => {
          this.showNotification('Analytical Insights Recorded', 
              'Your systematic trade analysis has been documented.');
      });
  }

  logEmotionalInsights() {
      const emotionLog = document.getElementById('emotionLog').value;
      chrome.storage.local.set({ emotionLog }, () => {
          this.showNotification('Emotional Intelligence Log', 
              'Cognitive insights and emotional state objectively recorded.');
      });
  }

  showNotification(title, message) {
      // Create a notification element
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

      // Remove notification after 3 seconds
      setTimeout(() => {
          document.body.removeChild(notification);
      }, 3000);
  }
}

// Initialize the Trading Plan Manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TradingPlanManager();
});

// Background sync and periodic analysis (optional)
chrome.alarms.create('dailyTradeReview', {
  periodInMinutes: 1440  // 24 hours
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'dailyTradeReview') {
      // Perform background analysis or send reminders
      chrome.storage.local.get(null, (data) => {
          console.log('Daily Trade Review Data:', data);
          // Implement your daily review logic here
      });
  }
});